<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddressSeederAdvanced extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Read data from JSON file
        $data = json_decode(file_get_contents(storage_path('administrative-areas.json')), true);

        // Insert provinces
        $provinces = array_unique(array_column($data, 'province'));
        foreach ($provinces as $province) {
            DB::table('provinces')->insert(['name' => $province]);
        }

        // Insert districts and cities
        foreach ($data as $record) {
            $provinceId = DB::table('provinces')->where('name', $record['province'])->value('id');
            $districtId = DB::table('districts')->where('name', $record['district'])->value('id');

            if (!$districtId) {
                // If district doesn't exist, insert it
                $districtId = DB::table('districts')->insertGetId(['name' => $record['district'], 'province_id' => $provinceId]);
            }

            // Insert city
            DB::table('cities')->insert(['name' => $record['city'], 'district_id' => $districtId]);
        }
    }
}