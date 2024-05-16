<?php

namespace App\Http\Controllers\Accounts;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Accounts\Address;
use App\Http\Controllers\Controller;
use App\Http\Requests\Accounts\AddressRequest;
use App\Http\Resources\Accounts\AddressResource;

class AddressController extends Controller
{

    public function index(Request $request)
    {
        /**  @var User $user */
        $user = $request->user();

        return AddressResource::collection($user->addresses);
    }

    public function store(AddressRequest $request)
    {
        $validated = $request->safe()->except('city');
        $cityId = $request->validated()['city'];

        $request->user()->addresses()->create(array_merge($validated, [
            'city_id' => $cityId
        ]));

        return response()->json([
            'message' => 'Address added successfully',
        ], 201);
    }

    public function show(Request $request, string $id)
    {
        $address = $request->user()->addresses()->find($id);

        return new AddressResource($address);
    }

    public function update(AddressRequest $request, string $id)
    {
        $validated = $request->safe()->except('city');
        $cityId = $request->validated()['city'];


        /**  @var Address $address */
        $address = $request->user()->addresses()->find($id);
        $address->update(array_merge($validated, [
            'city_id' => $cityId,
        ]));

        return response()->json([
            'message' => 'Address updated successfully',
        ], 201);
    }

    public function destroy(Request $request, string $id)
    {
        /**  @var User $user */
        $user = $request->user();

        /**  @var Address $address */
        $address = $user->addresses()->findOrFail($id);
        $address->delete();

        return response('', 204);
    }

    public function makeDefault(Request $request, string $id)
    {
        /**  @var User $user */
        $user = $request->user();

        /**  @var Address $address */
        $address = $user->addresses()->findOrFail($id);
        $address->makeDefault();
        $address->save();

        return response()->json([
            'message' => 'Default address updated successfully',
        ]);
    }
}