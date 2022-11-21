<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contents extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'recipe_id',
        'media',
        'step',
    ];

    protected $casts = [
        'media' => AsArrayObject::class
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
        $this->attributes['media'] = (string)$value;
    }

    public function recipes()
    {
        return $this->hasOne(Recipes::class, 'id', 'recipe_id');
    }
}
