<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contents>
 */
class ContentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'recipe_id' => 1,
            'media' => json_encode([
                'path' => 'recipes/default-content.png'
            ]),
            'step' => 'step description',
        ];
    }
}
