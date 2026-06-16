import { NextResponse } from 'next/server';
import { getNotifications } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const notifications = await getNotifications();
        return NextResponse.json(notifications, {
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Notification feed error:', error);
        return NextResponse.json({ error: 'Backend unavailable' }, { status: 503 });
    }
}
