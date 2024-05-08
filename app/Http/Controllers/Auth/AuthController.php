<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;

use App\Http\Requests\Auth\LoginRequest;
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

    public function login(LoginRequest $request)
    {
        $credentials = $request->safe()->except(['remember']);
        $remember = $request->safe()->only(['remember'])['remember'];

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => "Provided email or password is incorrect"
            ], 422);
        }

        $user = Auth::user();


        if ($remember) {
            $expiration_time = now()->addMonth();
        } else {
            $expiration_time = now()->addDay();
        }

        $token = $user->createToken('user', ['*'], $expiration_time);
        return new AuthResource($user, $token);
    }
}