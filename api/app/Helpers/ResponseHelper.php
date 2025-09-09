<?php

if (!function_exists('apiResponse')) {
    /**
     * Standard API response format
     *
     * @param bool $status
     * @param string $message
     * @param mixed $data
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    function apiResponse(bool $status, string $message = '', $data = null, int $statusCode = 200)
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }
}
