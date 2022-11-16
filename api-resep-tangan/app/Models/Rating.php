<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'rating',
        'recipe_id',
        'user_id',
    ];

    public function user()
    {
        $this->hasOne(User::class, 'id', 'user_id');
    }

    public function recipe()
    {
        $this->hasOne(Recipes::class, 'id', 'recipe_id');
    }
}