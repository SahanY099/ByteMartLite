<?php

namespace App\Http\Resources\Cart;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'productId' => $this->product_id,
            'name' => $this->product->name,
            'total' => number_format($this->getTotal(), 2),
            'image' => $this->product->getFirstMediaUrl('product-images'),
        ];
    }
}