<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Matematika Dasar',
                'description' => 'Tes kemampuan matematika dasar meliputi aljabar, geometri, dan aritmatika',
                'duration_minutes' => 60,
                'is_active' => true,
            ],
            [
                'name' => 'Bahasa Inggris',
                'description' => 'Tes kemampuan bahasa Inggris meliputi grammar, vocabulary, dan reading comprehension',
                'duration_minutes' => 45,
                'is_active' => true,
            ],
            [
                'name' => 'Tes Potensi Akademik (TPA)',
                'description' => 'Tes kemampuan verbal, numerik, dan logika',
                'duration_minutes' => 90,
                'is_active' => true,
            ],
            [
                'name' => 'Pengetahuan Umum',
                'description' => 'Tes wawasan kebangsaan dan pengetahuan umum',
                'duration_minutes' => 30,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            DB::table('test_categories')->insert(array_merge($category, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
