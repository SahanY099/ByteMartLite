<?php

namespace App\Rules;

use App\Models\Accounts\Address;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AddressType implements ValidationRule
{
    protected $isBilling = false;

    public function __construct($type)
    {
        if ($type == 'billing') {
            $this->isBilling = true;
        }
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!Address::where('id', $value)->where('is_billing', $this->isBilling)->exists()) {
            $fail('The selected address is not valid');
        }
        ;
    }
}
