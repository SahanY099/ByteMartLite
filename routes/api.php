<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;

use App\Http\Controllers\Accounts\AccountController;
use App\Http\Controllers\Accounts\AddressController;
use App\Http\Controllers\Accounts\AdministrativeAreaController;

use App\Http\Controllers\products\CategoryController;
use App\Http\Controllers\Products\ProductManagementController;
use App\Http\Controllers\Products\ProductStoreFrontController;
use App\Http\Controllers\Products\ProductStoreFrontSearchController;

use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\Cart\CartItemController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/signup', 'signup');
        Route::post('/login', 'login');
        Route::post('/logout', 'logout')->middleware('auth:sanctum');
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
        Route::prefix('addresses')->group(function () {
            Route::prefix('administrative-areas')->group(function () {
                Route::controller(AdministrativeAreaController::class)->group(function () {
                    Route::get('/', 'provinces');
                    Route::get('/{province}', 'cities');
                });
            });
            Route::controller(AddressController::class)->group(function () {
                Route::get('/', 'index');
                Route::post('/', 'store');
                Route::get('/{id}', 'show');
                Route::post('/{id}', 'update');
                Route::delete('/{id}', 'destroy');
                Route::delete('/{id}/make-default', 'makeDefault');
            });
        });
    });
});

Route::prefix('seller')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('products')->group(function () {
            Route::controller(ProductManagementController::class)->group(function () {
                Route::get('/', 'index');
                Route::post('/', 'store');
                Route::get('/{id}', 'show');
                Route::post('/{id}', 'update');
                // Route::delete('/{id}', 'destroy');
            });
        });

    });
});

Route::prefix('categories')->group(function () {
    Route::controller(CategoryController::class)->group(function () {
        Route::get('/', 'index');
    });
});

Route::prefix('products')->group(function () {
    Route::get('/search', ProductStoreFrontSearchController::class);

    Route::controller(ProductStoreFrontController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'show');
    });
});

Route::prefix('cart')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::controller(CartController::class)->group(function () {
            Route::get('/', 'index');
        });
        Route::prefix('cart-items')->group(function () {
            Route::controller(CartItemController::class)->group(function () {
                Route::post('/', 'store');
                Route::delete('/', 'delete');
                Route::post('/{id}', 'update');
                Route::delete('/{id}', 'destroy');
            });
        });
    });
});