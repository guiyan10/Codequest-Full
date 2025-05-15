<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'level' => $user->level,
                    'xp' => $user->xp,
                ],
                'token' => $user->createToken('auth_token')->plainTextToken,
            ]);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Invalid credentials',
        ], 401);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ], [
            'name.required' => 'Campo nome é obrigatório',
            'email.required' => 'Campo email é obrigatório',
            'email.email' => 'Campo email deve ser um email válido',
            'email.unique' => 'Email já cadastrado',
            'password.required' => 'Campo senha é obrigatório',
            'password.min' => 'Campo senha deve ter no mínimo 6 caracteres',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'level' => 1,
            'xp' => 0,
        ]);

        if ($user) {
            return response()->json([
                'status' => 'success',
                'message' => 'Usuário cadastrado com sucesso',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'level' => $user->level,
                    'xp' => $user->xp,
                ],
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Erro ao registrar usuário',
        ], 500);
    }
}
