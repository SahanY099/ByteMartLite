<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Provinces
        $provinces = [
            'Western Province',
            'Central Province',
            'Southern Province',
            'Northern Province',
            'Eastern Province',
            'North Western Province',
            'North Central Province',
            'Uva Province',
            'Sabaragamuwa Province'
        ];

        foreach ($provinces as $province) {
            $provinceId = DB::table('provinces')->insertGetId([
                'name' => $province,
            ]);

            // Cities for each province
            $cities = $this->getCitiesByProvince($province);
            foreach ($cities as $city) {
                DB::table('cities')->insert([
                    'name' => $city,
                    'province_id' => $provinceId,
                ]);
            }
        }
    }

    /**
     * Get cities by province.
     *
     * @param  string  $province
     * @return array
     */
    private function getCitiesByProvince($province)
    {
        // Define cities for each province here
        $citiesByProvince = [
            'Western Province' => ['Colombo', 'Gampaha', 'Kalutara', 'Moratuwa', 'Negombo', 'Panadura', 'Kaduwela', 'Kesbewa', 'Homagama', 'Dehiwala-Mount Lavinia'],
            'Central Province' => ['Kandy', 'Nuwara Eliya', 'Matale', 'Gampola', 'Peradeniya', 'Hatton', 'Dambulla', 'Kegalle', 'Balangoda', 'Mathale'],
            'Southern Province' => ['Galle', 'Matara', 'Hambantota', 'Ambalangoda', 'Galle', 'Weligama', 'Gampaha', 'Tangalle', 'Deniyaya', 'Hikkaduwa'],
            'Northern Province' => ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
            'Eastern Province' => ['Batticaloa', 'Ampara', 'Trincomalee', 'Kalmunai', 'Batticaloa', 'Akkaraipattu', 'Valaichchenai', 'Kinniya', 'Eravur', 'Sainthamaruthu'],
            'North Western Province' => ['Kurunegala', 'Puttalam', 'Kuliyapitiya', 'Chilaw', 'Narammala', 'Giriulla', 'Nikaweratiya', 'Wariyapola', 'Alawwa', 'Pannala'],
            'North Central Province' => ['Anuradhapura', 'Polonnaruwa', 'Medawachchiya', 'Talawa', 'Kekirawa', 'Habarana', 'Galnewa', 'Hingurakgoda', 'Thambuttegama', 'Elahera'],
            'Uva Province' => ['Badulla', 'Monaragala', 'Bandarawela', 'Welimada', 'Haputale', 'Badalkumbura', 'Passara', 'Mahiyangana', 'Ratnapura'],
            'Sabaragamuwa Province' => ['Ratnapura', 'Kegalle', 'Balangoda', 'Embilipitiya', 'Pelmadulla', 'Kuruwita', 'Rakwana', 'Nivithigala', 'Eheliyagoda', 'Ayagama']
        ];

        return $citiesByProvince[$province] ?? [];
    }
}
