<?php

namespace App\Http\Controllers;

use App\Models\QuizModel;
use Illuminate\Http\Request;

class QuizModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quizes = QuizModel::all();
        return view("welcome", compact('quizes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        QuizModel::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'description' => $request->description,
            
        ]);

        return redirect()->back()->with('success', 'Quiz created successfully');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(QuizModel $quizModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(QuizModel $quizModel, $id)
    {
        QuizModel::where('id', '=', $id)->update([
            'name' => request('name'),
            'description' => request('description'),
        ]);
        return redirect()->back()->with('success', 'Quiz editado com successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, QuizModel $quizModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(QuizModel $quizModel, $id)
    {
        $quizmModel = QuizModel::find($id);
        if ($quizmModel) {
            $quizmModel->delete();
            return response()->json(['message' => 'Quiz deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Quiz not found'], 404);
        }
    }
}
