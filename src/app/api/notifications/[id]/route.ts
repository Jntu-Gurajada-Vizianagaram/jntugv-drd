import { NextResponse } from 'next/server';
import { deleteNotification } from '@/lib/data';
import { verifyToken } from '@/lib/auth-helper';

// Need to handle params correctly in Next.js 15+ (Params is a Promise) 
// but sticking to standard signature for now, checking types later.
// Actually Next.js 13+ App Router:
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Updated for recent Next.js versions
) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await deleteNotification(parseInt(id));
    return NextResponse.json({ message: 'Deleted successfully' });
}
