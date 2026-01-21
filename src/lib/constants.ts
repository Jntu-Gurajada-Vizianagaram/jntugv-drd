
// This file serves as the single source of truth for the Backend API URL.
// It handles the distinction between Server-Side (Next.js server) and Client-Side (Browser) requests.

// The internal URL used by the Next.js server to talk to the Backend API directly.
// Uses environmental variable or defaults to correct port (6000).
export const INTERNAL_BACKEND_URL = process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:6000';

// The Public/Client-facing base URL.
export const API_URL = (() => {
    // Client-side: Return empty string to allow utilizing relative paths (e.g. /api/...)
    // This ensures requests go through the Next.js proxy/rewrites.
    if (typeof window !== 'undefined') {
        return '';
    }
    // Server-side: Use the full internal backend URL.
    return INTERNAL_BACKEND_URL;
})();

// Re-export BACKEND_URL as API_URL for backward compatibility if needed,
// or simply as the main export.
// Previous code used BACKEND_URL, but we want to standardize on API_URL or clear names.
// Let's keep INTERNAL_BACKEND_URL and API_URL.
