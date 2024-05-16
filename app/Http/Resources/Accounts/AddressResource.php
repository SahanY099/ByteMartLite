<?php

namespace App\Http\Resources\Accounts;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'street' => $this->street,
            'unit' => $this->unit,
            'city' => new CityResource($this->city),
            'province' => new ProvinceResource($this->province),
            'postalCode' => $this->postal_code,
            'isBilling' => $this->is_billing,
            'isDefault' => $this->is_default
        ];
    }
}