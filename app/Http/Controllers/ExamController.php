<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Question;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $exams = Exam::all()->transform(function ($exam){
            $exam->questions = $exam->questions->transform(function ($question){
                $question->answers;
                return $question;
            });
            $exam->category;
            return $exam;
        });

        return response()->json($exams->toArray());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        return response()->json(['_token' => csrf_token()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $exam = Exam::create($request->only(['title', 'duration']));
        return response()->json($exam);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Exam  $exam
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Exam $exam)
    {
        $exam->questions->map(function (Question $q){
            $q->category;
            $q->answers;
           return $q;
        });
        return response()->json($exam);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Exam  $exam
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Exam $exam)
    {
        return response()->json(['_token' => csrf_token()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Exam  $exam
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Exam $exam)
    {
        $exam = $exam->update($request->only(['title', 'duration']));
        return response()->json($exam);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Exam $exam
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();
        return response()->json([], 200);
    }
}
