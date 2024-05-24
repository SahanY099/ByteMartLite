<?php

namespace App\Http\Resources\products;

use Illuminate\Http\Request;

use App\Http\Resources\BaseResourceCollection;

class ProductManagementListCollection extends BaseResourceCollection
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
}
