<?php

namespace App\Http\Controllers\Cart;

use Illuminate\Http\Request;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\Cart\CartResource;

class CartController extends Controller
{
    public function index(Request $request)
    {
        /**  @var User $user */
        $user = $request->user();

        return new CartResource($user->cart);
    }
}