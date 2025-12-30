import { NextResponse } from 'next/server';
import { deleteNotification, updateNotification } from '@/lib/data';
import { verifyToken } from '@/lib/auth-helper';


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await deleteNotification(parseInt(id), token || '');
    return NextResponse.json({ message: 'Deleted successfully' });
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!verifyToken(token)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const formData = await request.formData();
        const updatedNote = await updateNotification(parseInt(id), formData, token || '');
        return NextResponse.json(updatedNote);
    } catch (error: any) {
        console.error("PUT Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
