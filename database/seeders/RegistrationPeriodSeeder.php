<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RegistrationPeriodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $periods = [
            [
                'name' => 'Jalur Reguler Gelombang 1',
                'academic_year' => '2025/2026',
                'registration_start' => Carbon::now()->subDays(10),
                'registration_end' => Carbon::now()->addDays(20),
                'test_date' => Carbon::now()->addDays(25),
                'announcement_date' => Carbon::now()->addDays(30),
                'is_active' => true,
            ],
            [
                'name' => 'Jalur Reguler Gelombang 2',
                'academic_year' => '2025/2026',
                'registration_start' => Carbon::now()->addDays(35),
                'registration_end' => Carbon::now()->addDays(55),
                'test_date' => Carbon::now()->addDays(60),
                'announcement_date' => Carbon::now()->addDays(65),
                'is_active' => false,
            ],
            [
                'name' => 'Jalur Prestasi',
                'academic_year' => '2025/2026',
                'registration_start' => Carbon::now()->subDays(5),
                'registration_end' => Carbon::now()->addDays(15),
                'test_date' => null, // Tidak ada tes untuk jalur prestasi
                'announcement_date' => Carbon::now()->addDays(20),
                'is_active' => true,
            ],
        ];

        foreach ($periods as $period) {
            DB::table('registration_periods')->insert(array_merge($period, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
