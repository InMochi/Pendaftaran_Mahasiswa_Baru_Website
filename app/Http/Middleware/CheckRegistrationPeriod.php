<?php

namespace App\Http\Middleware;

use App\Models\RegistrationPeriod;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRegistrationPeriod
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get active and open registration period
        $activePeriod = RegistrationPeriod::open()->first();

        if (!$activePeriod) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'Tidak ada periode pendaftaran yang sedang dibuka.');
        }

        // Share the active period with the request
        $request->merge(['active_period' => $activePeriod]);

        return $next($request);
    }
}
