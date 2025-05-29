<?php

namespace App\Http\Controllers;

use App\Models\Modules;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModulesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modules = Modules::with(['course', 'questions.options'])->get();
        return response()->json($modules);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'order_index' => 'required|integer',
            'duration' => 'required|string',
            'xp' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $module = Modules::create([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->content,
            'order_index' => $request->order_index,
            'duration' => $request->duration,
            'xp' => $request->xp
        ]);

        return response()->json($module->load(['course', 'questions.options']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Modules $module)
    {
        return response()->json($module->load(['course', 'questions.options']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Modules $modules)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Modules $module)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'exists:courses,id',
            'title' => 'string|max:255',
            'description' => 'string',
            'content' => 'string',
            'order_index' => 'integer',
            'duration' => 'string',
            'xp' => 'integer'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $module->update([
            'course_id' => $request->course_id ?? $module->course_id,
            'title' => $request->title ?? $module->title,
            'description' => $request->description ?? $module->description,
            'content' => $request->content ?? $module->content,
            'order_index' => $request->order_index ?? $module->order_index,
            'duration' => $request->duration ?? $module->duration,
            'xp' => $request->xp ?? $module->xp
        ]);

        return response()->json($module->load(['course', 'questions.options']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modules $module)
    {
        $module->delete();
        return response()->json(null, 204);
    }
}
