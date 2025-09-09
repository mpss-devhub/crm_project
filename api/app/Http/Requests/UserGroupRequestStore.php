<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserGroupRequestStore extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        if (is_string($this->permission)) {
            try {
                $decoded = json_decode($this->permission, true, 512, JSON_THROW_ON_ERROR);
                $this->merge([
                    'permission_codes' => $decoded
                ]);
            } catch (\JsonException $e) {
                $this->merge(['permission_codes' => []]);
            }
        }
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'system_type' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'permission' => 'required|array',
            'permission.*' => 'string',
        ];
    }
}
