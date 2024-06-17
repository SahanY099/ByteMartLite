<?php

namespace App\Http\Controllers\Cart;

use App\Models\User;
use App\Models\Cart\Cart;
use App\Models\Cart\CartItem;
use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\StoreCartItemRequest;
use App\Http\Requests\Cart\DestroyCartItemRequest;

class CartItemController extends Controller
{
    public function store(StoreCartItemRequest $request)
    {
        $data = $request->validated();
        $productId = $data['product_id'];
        $quantity = $data['quantity'] ?? 1;

        /**  @var User $user */
        $user = $request->user();

        /**  @var Cart $cart */
        $cart = $user->cart;

        /** @var CartItem $cartItem */
        $cartItem = $cart->items->where('product_id', $productId)->first();

        if ($cartItem) {
            $cartItem->incrementQuantity($quantity);
            return response('Item quantity updated', 200);
        }

        $cart->items()->create([
            'product_id' => $productId,
            'quantity' => $quantity
        ]);
        return response('Item added to the cart', 201);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyCartItemRequest $request, string $id)
    {
        $data = $request->validated();

        $quantity = $data['quantity'] ?? 1;
        $complete = $data['complete'] ?? false;

        /**  @var User $user */
        $user = $request->user();

        /**  @var Cart $cart */
        $cart = $user->cart;

        /** @var CartItem $cartItem */
        $cartItem = $cart->items->where('product_id', $id)->firstOrFail();

        if ($cartItem->quantity == 1 || $complete || $cartItem->quantity < $quantity) {
            $cartItem->delete();
            return response('', 204);
        }

        $cartItem->decrementQuantity($quantity);
        return response('Item decremented from cart', 200);
    }
}