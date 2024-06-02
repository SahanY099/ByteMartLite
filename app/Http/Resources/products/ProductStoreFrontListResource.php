<?php

namespace App\Http\Resources\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductStoreFrontListResource extends JsonResource
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
            'name' => $this->name,
            'price' => $this->price,
            'images' => $this->getImages(),
        ];
    }

    /**
     * Get the URLs of the product images.
     *
     * @return array<string>
     */
    private function getImages(): array
    {
        return $this->getMedia('product-images')->map(function ($media) {
            return $media->getUrl();
        })->toArray();
    }
}
