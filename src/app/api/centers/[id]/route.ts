import { NextResponse } from 'next/server';
import { INTERNAL_BACKEND_URL } from '@/lib/constants';
import axios from 'axios';

const BACKEND_ID_URL = (id: string) => `${INTERNAL_BACKEND_URL}/api/centers/${id}`;

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;
    const body = await request.json();

    try {
        const res = await axios.put(BACKEND_ID_URL(id), body, {
            headers: { 'Authorization': authHeader || '' }
        });
        return NextResponse.json(res.data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: error.message };
        return NextResponse.json(data, { status });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;
    try {
        const res = await axios.delete(BACKEND_ID_URL(id), {
            headers: { 'Authorization': authHeader || '' }
        });
        return NextResponse.json(res.data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: error.message };
        return NextResponse.json(data, { status });
    }
}
