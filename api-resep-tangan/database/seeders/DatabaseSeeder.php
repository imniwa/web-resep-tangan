<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('id_ID');
        $faker->addProvider(new \FakerRestaurant\Provider\id_ID\Restaurant($faker));

        for ($i = 0; $i < 20; $i++) {
            \App\Models\User::factory()->create([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'username' => $faker->unique()->userName(),
            ]);
        }
        for ($i = 0; $i < 20; $i++) {
            \App\Models\Recipes::factory()->create([
                'title' => $faker->foodName(),
                'description' => $faker->text(),
                'materials' => implode('\\n', (array)$faker->sentences($nb = 3, $asText = false)),
                'user_id' => $i + 1,
            ]);
        }
    }
}
