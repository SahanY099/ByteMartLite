<?php

namespace App\Http\Resources\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    protected $token;

    public function __construct($resource, $token)
    {
        parent::__construct($resource);
        $this->token = $token;
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'firstName' => $this->f_name,
            'lastName' => $this->l_name,
            'email' => $this->email,
            'image' => $this->getFirstMediaUrl('account-images'),
            'token' => [
                'key' => $this->token->plainTextToken,
                'expiresAt' => $this->token->accessToken->expires_at
            ],
        ];
    }
}
