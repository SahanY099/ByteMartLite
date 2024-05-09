<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/signup', 'signup');
        Route::post('/login', 'login');
    });
    Route::controller(PasswordResetController::class)->group(function () {
        Route::post('/verify-otp', 'verifyOtp');
        Route::post('/resend-otp', 'resendOtp');
        Route::post('/reset-password', 'resetPassword');
        Route::post('/forgot-password', 'forgotPassword');
    });
});
