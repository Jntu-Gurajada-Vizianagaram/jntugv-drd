import { NextResponse } from 'next/server';

const BACKEND_ID_URL = (id: string) => `http://localhost:5000/api/areas/${id}`;

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;
    const formData = await request.formData(); // Areas has file upload

    try {
        const res = await fetch(BACKEND_ID_URL(id), {
            method: 'PUT',
            headers: { 'Authorization': authHeader || '' },
            body: formData
        });
        if (!res.ok) throw new Error('Update failed');
        return NextResponse.json(await res.json());
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;
    try {
        const res = await fetch(BACKEND_ID_URL(id), {
            method: 'DELETE',
            headers: { 'Authorization': authHeader || '' }
        });
        if (!res.ok) throw new Error('Delete failed');
        return NextResponse.json({ message: 'Deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
