import { NextResponse } from 'next/server';
import { getNotifications, addNotification } from '@/lib/data';
import { verifyToken } from '@/lib/auth-helper';

export async function GET() {
    const data = await getNotifications();
    return NextResponse.json(data);
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
