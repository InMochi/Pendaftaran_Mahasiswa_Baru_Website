<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Registration;
use App\Models\TestSession;
use App\Models\StudyProgram;
use App\Models\RegistrationPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::with([
            'registration.user',
            'registration.biodata',
            'registration.testSession',
            'studyProgram'
        ])->orderBy('study_program_id')->orderBy('rank')->get();

        $stats = [
            'accepted' => $announcements->where('status', 'accepted')->count(),
            'rejected' => $announcements->where('status', 'rejected')->count(),
            'waiting_list' => $announcements->where('status', 'waiting_list')->count(),
        ];

        $periods = RegistrationPeriod::withCount('registrations')
        ->orderByDesc('registration_start')
        ->get();

        return Inertia::render('Admin/Announcement/Index', [
            'announcements' => $announcements,
            'periods' => $periods,
            'stats' => $stats,
        ]);
    }

    public function generate(Request $request)
    {
        $registrations = Registration::whereHas('testSession', function ($q) {
            $q->where('status', 'completed');
        })
        ->with([
            'testSession',
            'studyProgramChoices'
        ])
        ->orderByDesc(
            TestSession::select('total_score')
                ->whereColumn('test_sessions.registration_id', 'registrations.id')
        )
        ->get();

        $rank = 1;

        foreach ($registrations as $registration) {

            $choice = $registration->studyProgramChoices
                ->where('priority', 1)
                ->first();

            if (!$choice) {
                continue; // ✅ sekarang SAH
            }

            Announcement::updateOrCreate(
                ['registration_id' => $registration->id],
                [
                    'study_program_id' => $choice->study_program_id,
                    'rank' => $rank++,
                    'status' => $registration->testSession->total_score >= 40
                        ? Announcement::STATUS_ACCEPTED
                        : Announcement::STATUS_REJECTED,
                    'total_score' => $registration->testSession->total_score,
                    'announced_at' => now(),
                ]
            );
        }

        return back()->with('success', 'Announcement generated');
    }



    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:accepted,rejected,waiting_list'],
        ]);

        $announcement->update($validated);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Status berhasil diupdate.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return back()->with('success', 'Pengumuman berhasil dihapus.');
    }

}
