<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

use SadiqSalau\LaravelOtp\Facades\Otp;

use App\Models\User;
use App\Otp\ForgotPasswordOtp;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;

class PasswordResetController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $email = $request->only('email')['email'];

        if (User::where('email', '=', $email)->exists()) {
            Otp::identifier($email)->send(
                new ForgotPasswordOtp(),
                Notification::route('mail', $email)
            );
        }

        return response()->json([
            'message' => 'Otp sent successfully'
        ], 200);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|email',
                'code' => 'required|string|size:6'
            ]
        );

        $email = $request->only('email')['email'];
        $code = $request->only('code')['code'];

        $otp = Otp::identifier($email)->check($code);

        if ($otp['status'] == Otp::OTP_MATCHED) {
            return response('', 200);
        }

        return response()->json([
            'message' => 'Invalid code'
        ], 400);
    }

    public function resendOtp(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|email',
            ]
        );

        $email = $request->only('email')['email'];

        $otp = Otp::identifier($email)->update();

        if ($otp['status'] == Otp::OTP_SENT) {
            return response()->json([
                'message' => 'Otp sent successfully'
            ], 200);
        }

        return response()->json([
            'message' => 'Something went wrong.'
        ], 500);
    }



    public function resetPassword(ResetPasswordRequest $request)
    {
        $email = $request->validated()['email'];
        $code = $request->validated()['code'];
        $password = $request->validated()['password'];

        $otp = Otp::identifier($email)->attempt($code);

        if ($otp['status'] == Otp::OTP_PROCESSED) {
            if (User::where('email', '=', $email)->exists()) {
                $user = User::where('email', $email)->first();

                $user->fill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));
                $user->save();

                return response()->json([
                    'message' => 'Password reset successfully'
                ], 200);
            }
        }

        return response()->json([
            'message' => 'Invalid code'
        ], 400);

    }
}
