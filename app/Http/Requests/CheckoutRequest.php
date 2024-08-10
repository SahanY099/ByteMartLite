<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use App\Rules\AddressType;

class CheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'billing_address_id' => ['required', new AddressType('billing')],
            'shipping_address_id' => ['required', new AddressType('shipping')],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'billing_address_id' => $this->billingAddressId,
            'shipping_address_id' => $this->shippingAddressId
        ]);
    }
}
