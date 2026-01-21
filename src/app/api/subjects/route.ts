import { NextResponse } from 'next/server';
import { INTERNAL_BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import NodeFormData from 'form-data';

const BACKEND_URL = `${INTERNAL_BACKEND_URL}/api/subjects`;

export async function GET() {
    try {
        const res = await axios.get(BACKEND_URL);
        return NextResponse.json(res.data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 500 }
        );
    }
}

export async function POST(request: Request) {
    const authHeader = request.headers.get('authorization');
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

        const res = await axios.post(BACKEND_URL, nodeFormData, {
            headers: {
                'Authorization': authHeader || '',
                ...nodeFormData.getHeaders(),
            },
        });
        return NextResponse.json(res.data);
    } catch (error: any) {
        console.error("Proxy POST Error:", error.message);
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 500 }
        );
    }
}
