<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use Illuminate\Support\Facades\Config;

use App\Models\User;
use App\Models\Cart\Cart;
use App\Models\Orders\Order;
use App\Models\Cart\CartItem;
use App\Http\Requests\CheckoutRequest;


class CheckoutController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(CheckoutRequest $request)
    {
        /**  @var User $user */
        $user = $request->user();

        /**  @var Cart $cart */
        $cart = $user->cart;

        /** @var CartItem $cartItem */
        $cartItems = $cart->items;


        $stripe = new \Stripe\StripeClient(Config::get('stripe.stripe_secret_key'));
        $paymentIntent = $stripe->paymentIntents->create([
            'amount' => $cart->getTotal() * 100,
            'currency' => 'usd'
        ]);

        /**  @var Order $order */
        $order = $user->orders()->create([
            'status' => OrderStatus::Pending,
            'stripe_payment_intent_id' => $paymentIntent->id,
            'billing_address_id' => $request->billing_address_id,
            'shipping_address_id' => $request->shipping_address_id,
        ]);

        foreach ($cartItems as $cartItem) {
            $order->items()->create([
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->product->price,
                'product_id' => $cartItem->product_id,
            ]);
        }

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function webhook()
    {
        // Stripe CLI webhook secret for testing endpoint locally.
        $endpoint_secret = Config::get('stripe.stripe_webhook_secret');

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response('', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response('', 400);
        }

        // Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':
                $paymentIntent = $event->data->object;

                /**  @var Order $order */
                $order = Order::where('stripe_payment_intent_id', $paymentIntent->id)->first();

                if ($order && !$order->paid) {
                    $order->paid = true;
                    $order->save();
                    $order->user->cart->items()->delete();
                }
                break;
            case 'payment_intent.canceled':
            case 'payment_intent.payment_failed':
                $paymentIntent = $event->data->object;

                /**  @var Order $order */
                $order = Order::where('stripe_payment_intent_id', $paymentIntent->id)->first();
                $order->delete();
                break;
            default:
                echo 'Received un-configured event type' . $event->type;
        }

        return response('');
    }
}