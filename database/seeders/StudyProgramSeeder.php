<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudyProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            [
                'name' => 'Teknik Informatika',
                'code' => 'TI',
                'faculty' => 'Fakultas Teknik',
                'quota' => 100,
                'description' => 'Program studi yang mempelajari ilmu komputer, pemrograman, dan teknologi informasi',
                'is_active' => true,
            ],
            [
                'name' => 'Sistem Informasi',
                'code' => 'SI',
                'faculty' => 'Fakultas Teknik',
                'quota' => 80,
                'description' => 'Program studi yang fokus pada pengelolaan sistem informasi dalam organisasi',
                'is_active' => true,
            ],
            [
                'name' => 'Teknik Elektro',
                'code' => 'TE',
                'faculty' => 'Fakultas Teknik',
                'quota' => 60,
                'description' => 'Program studi yang mempelajari kelistrikan, elektronika, dan telekomunikasi',
                'is_active' => true,
            ],
            [
                'name' => 'Manajemen',
                'code' => 'MJ',
                'faculty' => 'Fakultas Ekonomi dan Bisnis',
                'quota' => 120,
                'description' => 'Program studi yang mempelajari pengelolaan bisnis dan organisasi',
                'is_active' => true,
            ],
            [
                'name' => 'Akuntansi',
                'code' => 'AK',
                'faculty' => 'Fakultas Ekonomi dan Bisnis',
                'quota' => 100,
                'description' => 'Program studi yang mempelajari pencatatan dan pelaporan keuangan',
                'is_active' => true,
            ],
            [
                'name' => 'Desain Komunikasi Visual',
                'code' => 'DKV',
                'faculty' => 'Fakultas Seni dan Desain',
                'quota' => 50,
                'description' => 'Program studi yang mempelajari desain grafis, multimedia, dan komunikasi visual',
                'is_active' => true,
            ],
        ];

        foreach ($programs as $program) {
            DB::table('study_programs')->insert(array_merge($program, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
