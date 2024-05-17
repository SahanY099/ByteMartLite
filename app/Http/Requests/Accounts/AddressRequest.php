<?php

namespace App\Http\Requests\Accounts;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'postal_code' => 'postalCode',
            'is_billing' => 'isBilling',
        ];
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'street' => 'required|string',
            'unit' => 'nullable|string',
            'city' => [
                'required',
                'exists:cities,id',
                /* Rule::exists('cities', 'id')->where(function (Builder $query) {
                    $query->where('province_id', $this->input('province'));
                }), */
            ],
            'postal_code' => 'required|digits:5',
            'is_billing' => 'required|boolean',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'postal_code' => $this->postalCode,
            'is_billing' => $this->isBilling,
        ]);
    }
}
