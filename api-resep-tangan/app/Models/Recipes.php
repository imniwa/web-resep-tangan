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
        'banner',
        'materials',
        'user_id',
    ];

    protected $casts = [
        'banner' => AsArrayObject::class
    ];

    /**
     * This will be called when fetching the element.
     */
    public function getMediaAttribute($value)
    {
        return $value;
    }

    /**
     * This will be called when storing/updating the element.
     */
    public function setMediaAttribute($value)
    {
        $this->attributes['banner'] = (string)$value;
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function contents()
    {
        return $this->hasMany(Contents::class, 'recipe_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comments::class, 'recipe_id', 'id');
    }

    public function views()
    {
        return $this->hasMany(Views::class, 'recipe_id', 'id');
    }
}
