<?php

namespace App\Http\Controllers\Products;


use Illuminate\Http\Request;

use App\Models\Products\Product;
use App\Http\Controllers\Controller;
use App\Http\Resources\Products\ProductStoreFrontListResource;
use App\Http\Resources\Products\ProductStoreFrontDetailResource;

class ProductStoreFrontController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::latest()->limit(8)->get();

        return ProductStoreFrontListResource::collection($products);
    }

    public function show(Request $request, string $id)
    {
        $product = Product::findOrFail($id);
        return new ProductStoreFrontDetailResource($product);
    }
}
