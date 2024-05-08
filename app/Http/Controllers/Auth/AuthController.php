<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\Auth\AuthResource;
use App\Http\Requests\Auth\SignupRequest;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /**  @var User $user */
        $user = User::create(
            [
                'email' => $data['email'],
                'f_name' => $data['f_name'],
                'l_name' => $data['l_name'],
                'password' => bcrypt($data['password']),
            ]
        );

        $expiration_time = now()->addDay();

        $token = $user->createToken('user', ['*'], $expiration_time);

        return new AuthResource($user, $token);
    }
}