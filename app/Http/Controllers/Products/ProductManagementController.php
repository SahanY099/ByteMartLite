<?php

namespace App\Http\Controllers\Products;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Products\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\Products\ProductManagementRequest;

class ProductManagementController extends Controller
{
    public function index(Request $request)
    {
        // **  @var User $user */
        $user = $request->user();
    }

    public function store(ProductManagementRequest $request)
    {
        $data = $request->validated();

        /**  @var User $user */
        $user = $request->user();

        /**  @var Product $product */
        $product = $user->products()->create($data);

        if ($request->hasFile('images')) {
            collect($product->addMultipleMediaFromRequest(['images']))
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('product-images');
                });
        }

        return response()->json([
            'message' => 'Product created successfully',
        ], 201);
    }

    public function show(string $id)
    {
        //
    }

    public function update(ProductManagementRequest $request, string $id)
    {
        $data = $request->validated();

        /**  @var User $user */
        $user = $request->user();

        /**  @var Product $product */
        $product = $user->products()->findOrFail($id);

        $product->update($data);

        return response()->json([
            'message' => 'Product updated successfully',
        ], 200);
    }

    public function destroy(string $id)
    {
        //
    }
}
