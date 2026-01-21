import { NextResponse } from 'next/server';
import { INTERNAL_BACKEND_URL } from '@/lib/constants';
import axios from 'axios';

const BACKEND_URL = `${INTERNAL_BACKEND_URL}/api/contact`;

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Proxy the request to the backend express server
        const res = await axios.post(BACKEND_URL, body);

        return NextResponse.json(res.data);
    } catch (error: any) {
        console.error("Contact Proxy Error:", error.message);
        return NextResponse.json(
            { message: error.response?.data?.message || 'Failed to send message' },
            { status: error.response?.status || 500 }
        );
    }
}
