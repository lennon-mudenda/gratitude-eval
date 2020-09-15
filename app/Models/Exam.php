<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Exam extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title', 'duration'
    ];

    protected $dates = [
        'deleted_at'
    ];

    protected $casts = [
        'title' => 'string',
        'duration' => 'string',
        'updated_at' => 'datetime',
        'created_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function questions()
    {
        return $this->hasMany(Question::class, 'question_id');
    }
}
