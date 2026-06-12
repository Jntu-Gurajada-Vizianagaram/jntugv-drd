import { NextResponse } from 'next/server';
import { getNotifications } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
    const notifications = await getNotifications();

    return NextResponse.json(notifications, {
        headers: {
            'Cache-Control': 'no-store',
        },
    });
}
