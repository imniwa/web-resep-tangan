<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipes extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'views',
        'user_id'
    ];
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'views' => 0,
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}