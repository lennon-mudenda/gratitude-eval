<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = collect(['Technical', 'Aptitude', 'Logical']);
        $categories->map(function ($category){
            return Category::create(['name' => $category]);
        });
    }
}
