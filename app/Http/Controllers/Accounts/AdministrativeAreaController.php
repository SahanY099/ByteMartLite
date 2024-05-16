<?php

namespace App\Http\Controllers\Accounts;

use App\Models\Accounts\Province;
use App\Http\Resources\Accounts\CityResource;
use App\Http\Resources\Accounts\ProvinceResource;

use App\Http\Controllers\Controller;

class AdministrativeAreaController extends Controller
{
    public function provinces()
    {
        $provinces = Province::all();
        return ProvinceResource::collection($provinces);
    }

    public function cities(string $province)
    {
        $cities = Province::find($province)->cities;
        return CityResource::collection($cities);
    }
}