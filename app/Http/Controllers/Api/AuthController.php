<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Inscription d'un utilisateur
     * @param SignupRequest $request
     * @return Application|ResponseFactory|\Illuminate\Foundation\Application|Response
     */
    public function signup(SignupRequest $request)
    {
        // Validation des données
        $data = $request->validated();

        // Créer User
        /** @var User $user */
        $user = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        // Créer le jeton sur le user
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('token', 'user'));
    }

    /**
     * Connexion d'un utilisateur
     * @param LoginRequest $request
     * @return Application|ResponseFactory|\Illuminate\Foundation\Application|Response
     */
    public function login(LoginRequest $request)
    {
        // Validation des identifiants de connexion 'email' et 'password'
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Provided email address or password incorrect.'], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('token', 'user'));
    }

    /**
     * Deconnexion d'un utilisateur
     * @param Request $request
     * @return Application|ResponseFactory|\Illuminate\Foundation\Application|Response
     */
    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
