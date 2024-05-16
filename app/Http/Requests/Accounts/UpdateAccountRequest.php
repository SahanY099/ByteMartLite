<?php

namespace App\Http\Requests\Accounts;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAccountRequest extends FormRequest
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
            'f_name' => 'firstName',
            'l_name' => 'lastName',
        ];
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'f_name' => 'required|max:50',
            'l_name' => 'required|max:50',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'f_name' => $this->firstName,
            'l_name' => $this->lastName,
        ]);
    }
}
