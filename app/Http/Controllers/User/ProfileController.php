<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display user profile
     */
    public function index()
    {
        $user = Auth::user()->load(['registrations.biodata', 'registrations.registrationPeriod']);

        // Format biodata birth_date as Y-m-d so HTML date inputs show the value
        foreach ($user->registrations as $registration) {
            if ($registration->biodata && $registration->biodata->birth_date) {
                try {
                    $registration->biodata->birth_date = \Carbon\Carbon::parse($registration->biodata->birth_date)->format('Y-m-d');
                } catch (\Exception $e) {
                    // leave original value if parsing fails
                }
            }
        }

        return Inertia::render('User/Profile/Index', [
            'user' => $user,
        ]);
    }

    /**
     * Update user profile
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'phone' => ['nullable', 'string', 'max:20'],
        ]);

        // Separate phone handling: store phone in biodata if active registration exists
        $phone = $validated['phone'] ?? null;
        unset($validated['phone']);

        $user->update($validated);

        if ($phone !== null) {
            $registration = $user->getActiveRegistration();
            if ($registration && $registration->biodata) {
                $registration->biodata->update(['phone' => $phone]);
            }
        }

        return redirect()->route('profile.index')
            ->with('success', 'Profil berhasil diperbarui.');
    }

    /**
     * Update avatar
     */
    public function updateAvatar(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'avatar' => ['required', 'image', 'max:2048', 'mimes:jpg,jpeg,png'],
        ]);

        // Delete old avatar if exists
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        // Store new avatar
        $file = $request->file('avatar');
        $filename = time() . '_' . $user->id . '.' . $file->extension();
        $path = $file->storeAs('avatars', $filename, 'public');

        $user->update([
            'avatar_path' => $path,
        ]);

        return redirect()->route('profile.index')
            ->with('success', 'Foto profil berhasil diperbarui.');
    }

    /**
     * Delete avatar
     */
    public function deleteAvatar()
    {
        $user = Auth::user();

        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
            $user->update(['avatar_path' => null]);
        }

        return redirect()->route('profile.index')
            ->with('success', 'Foto profil berhasil dihapus.');
    }

    /**
     * Change password
     */
    public function changePassword(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'confirmed', Password::min(8)],
        ], [
            'current_password.required' => 'Password saat ini harus diisi.',
            'new_password.required' => 'Password baru harus diisi.',
            'new_password.confirmed' => 'Konfirmasi password tidak cocok.',
            'new_password.min' => 'Password minimal 8 karakter.',
        ]);

        // Check current password
        if (!Hash::check($validated['current_password'], $user->password)) {
            return back()->withErrors([
                'current_password' => 'Password saat ini tidak sesuai.',
            ]);
        }

        // Update password
        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return redirect()->route('profile.index')
            ->with('success', 'Password berhasil diubah.');
    }

    /**
     * Update biodata (if exists)
     */
    public function updateBiodata(Request $request)
    {
        $user = Auth::user();
        $registration = $user->getActiveRegistration();

        if (!$registration || !$registration->biodata) {
            return redirect()->back()
                ->with('error', 'Biodata tidak ditemukan.');
        }

        $validated = $request->validate([
            'nik' => ['required', 'string', 'size:16', 'unique:biodata,nik,' . $registration->biodata->id],
            'full_name' => ['required', 'string', 'max:255'],
            'birth_place' => ['required', 'string', 'max:100'],
            'birth_date' => ['required', 'date', 'before:today'],
            'gender' => ['required', 'in:male,female'],
            'phone' => ['required', 'string', 'max:20'],
            'address' => ['required', 'string'],
            'school_origin' => ['required', 'string', 'max:255'],
        ]);

        $registration->biodata->update($validated);

        return redirect()->route('profile.index')
            ->with('success', 'Biodata berhasil diperbarui.');
    }
}
