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


        $this->command->info("Seeding User");
        $this->command->getOutput()->progressStart(20);
        for ($i = 0; $i < 20; $i++) {
            \App\Models\User::factory()->create([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'username' => $faker->unique()->userName(),
            ]);
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();

        $this->command->info("Seeding Recipes");
        $this->command->getOutput()->progressStart(20);
        for ($i = 0; $i < 20; $i++) {
            $materials = [];
            for ($j=0; $j < rand(1,4); $j++) { 
                $materials[] = rand(3,6).' '.$faker->vegetableName();
            }
            for ($j=0; $j < rand(2,6); $j++) { 
                $materials[] = rand(3,8).' '.$faker->meatName();
            }
            \App\Models\Recipes::factory()->create([
                'title' => $faker->foodName(),
                'description' => $faker->text(),
                'materials' => implode('\\n', $materials),
                'user_id' => $i + 1,
            ]);
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();


        $this->command->info("Seeding Contents");
        $this->command->getOutput()->progressStart(20);
        for ($i = 0; $i < 20; $i++) {
            for ($j = 0; $j < rand(6, 10); $j++) {
                \App\Models\Contents::factory()->create([
                    'recipe_id' => $i + 1,
                    'step' => $faker->text()
                ]);
            }
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();


        $this->command->info("Seeding Comments");
        $this->command->getOutput()->progressStart(20);
        for ($i = 0; $i < 20; $i++) {
            for ($j = 0; $j < rand(5, 10); $j++) {
                \App\Models\Comments::factory()->create([
                    'message' => $faker->text(),
                    'recipe_id' => $i + 1,
                    'user_id' => rand(1, 20)
                ]);
            }
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();

        $this->command->info("Seeding Rating");
        $this->command->getOutput()->progressStart(20);
        for ($i = 0; $i < 20; $i++) {
            for ($j = 0; $j < rand(7, 9); $j++) {
                \App\Models\Rating::factory()->create([
                    'rating' => rand(3, 5),
                    'recipe_id' => $i + 1,
                    'user_id' => rand(1, 20)
                ]);
            }
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();


        $this->command->info("Seeding Follow");
        $this->command->getOutput()->progressStart(20);
        for ($i = 0; $i < 20; $i++) {
            for ($j = 0; $j < rand(7, 14); $j++) {
                $follow = rand(1, 20);
                while ($follow == $i + 1) {
                    $follow = rand(1, 20);
                }
                \App\Models\Follows::factory()->create([
                    'id_user' => $i + 1,
                    'follow' => $follow
                ]);
            }
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();
    }
}
