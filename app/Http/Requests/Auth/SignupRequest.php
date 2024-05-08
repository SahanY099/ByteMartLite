<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
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
            'email' => 'required|email|unique:users,email|max:255',
            'f_name' => 'required|max:50',
            'l_name' => 'required|max:50',
            'password' => [
                'required',
                Password::min(8)
                    ->max(128)
                    ->letters()
                    ->symbols()
            ],
            'confirmPassword' => 'required|same:password',
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