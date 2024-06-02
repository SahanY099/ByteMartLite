<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

class ProductSearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'sort_by' => 'sort',
            'order_by' => 'order',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'q' => 'nullable|string|max:255',
            'category' => 'nullable|integer',
            'sort_by' => 'nullable|string|in:name,price,created_at',
            'order_by' => 'nullable|string|in:asc,desc'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'sort_by' => $this->sort,
            'order_by' => $this->order,
        ]);
    }
}