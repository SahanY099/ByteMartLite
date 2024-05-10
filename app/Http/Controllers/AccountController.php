<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use Illuminate\Http\Request;

use App\Models\User;

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

    public function updateImage(Request $request)
    {
        /**  @var User $user */
        $user = $request->user();

        $user->addMediaFromRequest('image')->toMediaCollection('account-images');
    }
}
