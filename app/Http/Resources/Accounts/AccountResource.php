<?php

namespace App\Http\Resources\Accounts;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'firstName' => $this->f_name,
            'lastName' => $this->l_name,
            'email' => $this->email,
            'image' => $this->getFirstMediaUrl('account-images'),
        ];
    }
}