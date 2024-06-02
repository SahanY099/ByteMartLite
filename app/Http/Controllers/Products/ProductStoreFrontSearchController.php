<?php

namespace App\Http\Controllers\Products;

use App\Models\Products\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\Products\ProductSearchRequest;
use App\Http\Resources\Products\ProductStoreFrontSearchCollection;

class ProductStoreFrontSearchController extends Controller
{
    const DEFAULT_SORT_BY = 'created_at';
    const DEFAULT_ORDER_BY = 'desc';

    public function __invoke(ProductSearchRequest $request)
    {
        $query = $this->buildProductQuery($request);

        $sortBy = $request->filled('sort_by') ? $request->input('sort_by') : self::DEFAULT_SORT_BY;
        $orderBy = $request->filled('order_by') ? $request->input('order_by') : self::DEFAULT_ORDER_BY;
        $query->orderBy($sortBy, $orderBy);

        $products = $query->paginate(10);

        return new ProductStoreFrontSearchCollection($products);
    }

    /**
     * Build the query for fetching products based on request parameters.
     *
     * @param ProductSearchRequest $request
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function buildProductQuery(ProductSearchRequest $request)
    {
        $query = Product::query();

        if ($request->filled('q')) {
            $query->where('name', 'like', '%' . $request->input('q') . '%');
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->input('category'));
        }

        return $query;
    }
}