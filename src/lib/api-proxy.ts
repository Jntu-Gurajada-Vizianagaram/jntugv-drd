import { NextResponse } from 'next/server';

export function createProxy(endpoint: string) {
    const BACKEND_URL = `http://localhost:5000/api/${endpoint}`;

    return {
        GET: async () => {
            try {
                const res = await fetch(BACKEND_URL, { cache: 'no-store' });
                // Handle non-200 responses (like 404 from backend not having route)
                if (!res.ok) {
                    const text = await res.text();
                    console.error(`Proxy GET Error ${endpoint}: ${res.status}`, text);
                    // Return valid JSON even if backend returned HTML
                    return NextResponse.json({ error: `Backend returned ${res.status}` }, { status: res.status });
                }
                const data = await res.json();
                return NextResponse.json(data);
            } catch (error: any) {
                console.error(`Proxy GET Failed ${endpoint}:`, error);
                return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
            }
        },
        POST: async (request: Request) => {
            const authHeader = request.headers.get('authorization');
            let body;
            const contentType = request.headers.get('content-type') || '';

            if (contentType.includes('multipart/form-data')) {
                body = await request.formData();
            } else {
                body = JSON.stringify(await request.json());
            }

            try {
                const res = await fetch(BACKEND_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': authHeader || '',
                        ...(contentType.includes('application/json') ? { 'Content-Type': 'application/json' } : {})
                    },
                    body: body
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Backend failed');
                return NextResponse.json(data);
            } catch (error: any) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

        }
    }
}
