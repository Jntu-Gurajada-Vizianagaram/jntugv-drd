import { NextResponse } from 'next/server';
import { INTERNAL_BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import NodeFormData from 'form-data';

const BACKEND_ID_URL = (id: string) => `${INTERNAL_BACKEND_URL}/api/subjects/${id}`;

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const authHeader = request.headers.get('authorization');
    const { id } = await params;

    try {
        const formData = await request.formData();
        const nodeFormData = new NodeFormData();

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                const buffer = Buffer.from(await value.arrayBuffer());
                nodeFormData.append(key, buffer, value.name);
            } else {
                nodeFormData.append(key, value);
            }
        }

        const res = await axios.put(BACKEND_ID_URL(id), nodeFormData, {
            headers: {
                'Authorization': authHeader || '',
                ...nodeFormData.getHeaders()
            }
        });
        return NextResponse.json(res.data);
    } catch (error: any) {
        console.error("Proxy PUT Error:", error.message);
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
