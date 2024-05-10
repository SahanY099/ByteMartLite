<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;

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

Route::prefix('account')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::controller(AccountController::class)->group(function () {
            Route::get('/', 'show');
            Route::post('/', 'update');
            Route::post('/update-image', 'updateImage');
        });
    });
});
