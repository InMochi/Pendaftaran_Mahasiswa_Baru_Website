<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Soal Matematika (kategori 1)
        $mathQuestions = [
            [
                'test_category_id' => 1,
                'question_text' => 'Berapakah hasil dari 15 × 12?',
                'question_type' => 'multiple_choice',
                'option_a' => '150',
                'option_b' => '180',
                'option_c' => '200',
                'option_d' => '210',
                'option_e' => '225',
                'correct_answer' => 'b',
                'points' => 5,
                'is_active' => true,
            ],
            [
                'test_category_id' => 1,
                'question_text' => 'Jika x + 5 = 12, maka nilai x adalah...',
                'question_type' => 'multiple_choice',
                'option_a' => '5',
                'option_b' => '6',
                'option_c' => '7',
                'option_d' => '8',
                'option_e' => '9',
                'correct_answer' => 'c',
                'points' => 5,
                'is_active' => true,
            ],
            [
                'test_category_id' => 1,
                'question_text' => 'Luas persegi dengan sisi 8 cm adalah...',
                'question_type' => 'multiple_choice',
                'option_a' => '32 cm²',
                'option_b' => '48 cm²',
                'option_c' => '64 cm²',
                'option_d' => '72 cm²',
                'option_e' => '80 cm²',
                'correct_answer' => 'c',
                'points' => 5,
                'is_active' => true,
            ],
        ];

        // Soal Bahasa Inggris (kategori 2)
        $englishQuestions = [
            [
                'test_category_id' => 2,
                'question_text' => 'She ... to the market every Sunday.',
                'question_type' => 'multiple_choice',
                'option_a' => 'go',
                'option_b' => 'goes',
                'option_c' => 'going',
                'option_d' => 'gone',
                'option_e' => 'went',
                'correct_answer' => 'b',
                'points' => 5,
                'is_active' => true,
            ],
            [
                'test_category_id' => 2,
                'question_text' => 'What is the synonym of "happy"?',
                'question_type' => 'multiple_choice',
                'option_a' => 'Sad',
                'option_b' => 'Angry',
                'option_c' => 'Joyful',
                'option_d' => 'Tired',
                'option_e' => 'Hungry',
                'correct_answer' => 'c',
                'points' => 5,
                'is_active' => true,
            ],
        ];

        // Soal TPA (kategori 3)
        $tpaQuestions = [
            [
                'test_category_id' => 3,
                'question_text' => 'Jika semua A adalah B, dan semua B adalah C, maka...',
                'question_type' => 'multiple_choice',
                'option_a' => 'Semua A adalah C',
                'option_b' => 'Semua C adalah A',
                'option_c' => 'Tidak ada hubungan A dan C',
                'option_d' => 'Sebagian A adalah C',
                'option_e' => 'Tidak dapat disimpulkan',
                'correct_answer' => 'a',
                'points' => 10,
                'is_active' => true,
            ],
            [
                'test_category_id' => 3,
                'question_text' => 'Deret angka: 2, 4, 8, 16, ... Angka selanjutnya adalah?',
                'question_type' => 'multiple_choice',
                'option_a' => '24',
                'option_b' => '28',
                'option_c' => '32',
                'option_d' => '36',
                'option_e' => '40',
                'correct_answer' => 'c',
                'points' => 10,
                'is_active' => true,
            ],
        ];

        // Insert semua soal
        $allQuestions = array_merge($mathQuestions, $englishQuestions, $tpaQuestions);
        
        foreach ($allQuestions as $question) {
            DB::table('test_questions')->insert(array_merge($question, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
