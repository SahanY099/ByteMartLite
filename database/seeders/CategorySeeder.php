<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Products\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics'],
            ['name' => 'Clothing'],
            ['name' => 'Books'],
            ['name' => 'Home & Kitchen'],
            ['name' => 'Sports & Outdoors'],
            ['name' => 'Toys & Games'],
            ['name' => 'Health & Beauty'],
            ['name' => 'Automotive'],
            ['name' => 'Jewellery'],
            ['name' => 'Garden & Outdoors'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}