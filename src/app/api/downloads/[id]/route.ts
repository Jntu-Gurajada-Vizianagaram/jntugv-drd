import { NextResponse } from 'next/server';

const BACKEND_URL = 'http://localhost:5000/api/downloads';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;
    const formData = await request.formData();

    try {
        const res = await fetch(`${BACKEND_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': authHeader || ''
            },
            body: formData
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Backend failed');
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;

    try {
        const res = await fetch(`${BACKEND_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': authHeader || ''
            }
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Backend failed');
        }
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
