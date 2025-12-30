import { NextResponse } from 'next/server';

const BACKEND_URL = 'http://localhost:5000/api/downloads';

export async function GET() {
    try {
        const res = await fetch(BACKEND_URL, { cache: 'no-store' });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const authHeader = request.headers.get('authorization');
    const formData = await request.formData();

    try {
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Authorization': authHeader || ''
            },
            body: formData
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Backend failed');
        return NextResponse.json(data);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
