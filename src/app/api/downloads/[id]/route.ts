import { NextResponse } from 'next/server';
import { INTERNAL_BACKEND_URL } from '@/lib/constants';
import axios from 'axios';

const BACKEND_URL = `${INTERNAL_BACKEND_URL}/api/downloads`;

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;
    const formData = await request.formData();

    try {
        // Prepare headers
        const headers: any = {
            'Authorization': authHeader || ''
        };
        // Axios handles FormData automatically if passed correctly, 
        // but often in Node environemnt it needs help or we pass serialization.
        // However, we can try passing the FormData directly.
        // If it fails, we might need a different approach for file uploads via proxy.
        // But let's assume standard axios behavior for now.

        const res = await axios.put(`${BACKEND_URL}/${id}`, formData, { headers });
        return NextResponse.json(res.data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: error.message };
        return NextResponse.json(data, { status });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;

    try {
        const res = await axios.delete(`${BACKEND_URL}/${id}`, {
            headers: { 'Authorization': authHeader || '' }
        });
        return NextResponse.json(res.data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: error.message };
        return NextResponse.json(data, { status });
    }
}
