<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiCors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $origin = $request->header('Origin') ?: '*';
        
        // Allow both www and non-www versions
        $allowedOrigins = [
            'https://equaldeals.com',
            'https://www.equaldeals.com',
            'http://localhost:3000',
            'http://127.0.0.1:8000',
        ];
        
        if (in_array($origin, $allowedOrigins)) {
            $allowOrigin = $origin;
        } else {
            $allowOrigin = '*';
        }
        
        // Handle preflight OPTIONS request
        if ($request->isMethod('OPTIONS')) {
            return response()->json([], 200)
                ->header('Access-Control-Allow-Origin', $allowOrigin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-CSRF-TOKEN')
                ->header('Access-Control-Max-Age', '86400')
                ->header('Access-Control-Allow-Credentials', 'true');
        }

        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', $allowOrigin);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-CSRF-TOKEN');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
