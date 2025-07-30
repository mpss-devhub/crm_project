<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserGroupRequestStore extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'usergp_id' => 'required|string',
            'name' => 'required|string',
            'system_type' => 'required|string',
            'description' => 'nullable|string',
            'permission' => 'required|array',
        ];
    }
}
