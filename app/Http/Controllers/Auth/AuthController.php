<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * Show login page
     */
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Show register page
     */
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle login request
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'The provided credentials are incorrect.',
            ]);
        }

        $request->session()->regenerate();

        // Log activity
        ActivityLog::log(
            Auth::id(),
            ActivityLog::TYPE_LOGIN,
            'User logged in successfully'
        );

        // Determine intended redirect
        $redirectTo = Auth::user()->isAdmin() ? '/admin/dashboard' : '/dashboard';

        // If the request expects JSON (AJAX/XHR), return redirect URL so SPA can navigate
        if ($request->wantsJson() || $request->ajax() || $request->expectsJson()) {
            return response()->json(['redirect' => $redirectTo]);
        }

        return redirect()->intended($redirectTo);
    }

    /**
     * Handle register request
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'user', // Default role
        ]);

        // Auto login after register
        Auth::login($user);

        // Log activity
        ActivityLog::log(
            $user->id,
            ActivityLog::TYPE_REGISTER,
            'New user registered'
        );

        return redirect('/dashboard');
    }

    /**
     * Handle logout request
     */
    public function logout(Request $request)
    {
        // Log activity before logout
        ActivityLog::log(
            Auth::id(),
            ActivityLog::TYPE_LOGOUT,
            'User logged out'
        );

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Get current authenticated user
     */
    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Check if user is authenticated
     */
    public function check()
    {
        return response()->json([
            'authenticated' => Auth::check(),
            'user' => Auth::user(),
        ]);
    }
}
