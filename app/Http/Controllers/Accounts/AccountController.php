<?php

namespace App\Http\Controllers\Accounts;

use Illuminate\Http\Request;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\Accounts\AccountResource;
use App\Http\Requests\Accounts\ProfileImageRequest;
use App\Http\Requests\Accounts\UpdateAccountRequest;

class AccountController extends Controller
{
    public function show(Request $request)
    {
        /**  @var User $user */
        $user = $request->user();

        return new AccountResource($user);
    }


    public function update(UpdateAccountRequest $request)
    {
        /**  @var User $user */
        $user = $request->user();
        $validated = $request->validated();

        $user->update($validated);

        return response('', 204);
    }


    public function destroy(string $id)
    {
        //
    }

    public function updateImage(ProfileImageRequest $request)
    {
        /**  @var User $user */
        $user = $request->user();

        $user->addMediaFromRequest('image')->toMediaCollection('account-images');
    }
}
