<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Answer extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'answer', 'question_id', 'correct'
    ];

    protected $dates = [
        'deleted_at'
    ];

    protected $casts = [
        'answer' => 'string',
        'correct' => 'boolean',
        'updated_at' => 'datetime',
        'created_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
