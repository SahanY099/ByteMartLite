<?php

namespace App\Http\Resources\Products;

use Illuminate\Http\Request;
use App\Http\Resources\BaseResourceCollection;

class ProductStoreFrontSearchCollection extends BaseResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
        ];
    }

    public $collects = ProductStoreFrontListResource::class;
}