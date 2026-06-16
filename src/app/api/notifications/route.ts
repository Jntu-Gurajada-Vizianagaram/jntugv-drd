import { NextResponse } from 'next/server';
import { getNotifications, addNotification } from '@/lib/data';
import { verifyToken } from '@/lib/auth-helper';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await getNotifications();
        return NextResponse.json(data, {
            headers: { 'Cache-Control': 'no-store' },
        });
    } catch (error) {
        console.error('Notifications API proxy error:', error);
        return NextResponse.json({ error: 'Backend unavailable' }, { status: 503 });
    }
}

export async function POST(request: Request) {
    // Auth Check
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const newNote = await addNotification(formData, token || '');
    return NextResponse.json(newNote);
}
