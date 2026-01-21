import { NextResponse } from 'next/server';
import { INTERNAL_BACKEND_URL } from '@/lib/constants';
import axios from 'axios';


export function createProxy(endpoint: string) {
    // URL helper
    const getBaseUrl = () => {
        if (typeof window !== 'undefined') return '';
        return INTERNAL_BACKEND_URL;
    };

    return {
        GET: async () => {
            const BACKEND_URL = `${getBaseUrl()}/api/${endpoint}`;
            try {
                console.log(`[Proxy] Fetching ${BACKEND_URL}...`);
                const res = await axios.get(BACKEND_URL);
                console.log(`[Proxy] GET ${endpoint} success.`);
                return NextResponse.json(res.data);
            } catch (error: any) {
                console.error(`Proxy GET Failed ${endpoint}:`, error.message);
                const status = error.response?.status || 500;
                const data = error.response?.data || { error: 'Failed to fetch data', details: error.message };
                return NextResponse.json(data, { status });
            }
        },
        POST: async (request: Request) => {
            const BACKEND_URL = `${getBaseUrl()}/api/${endpoint}`;
            const authHeader = request.headers.get('authorization');
            let body;
            const contentType = request.headers.get('content-type') || '';
            const headers: any = {
                'Authorization': authHeader || ''
            };

            if (contentType.includes('multipart/form-data')) {
                // Axios handles FormData from node differently, need to convert or pass stream
                // For simplicity in Next.js, we might need to parse it or use a specific approach.
                // However, standard fetch with FormData is easier. 
                // Since this is bypassing port block, if we have files, axios might be tricky with standard Request formData.

                // Let's try passing the data directly if it's JSON.
                // If it's multipart, we might have issues.
                // But let's assume JSON mostly for now or pass as is.
                body = await request.formData();
                // This is tricky. Axios in Node doesn't like standard FormData object directly sometimes without headers.
            } else {
                body = await request.json();
                // headers['Content-Type'] = 'application/json'; // Axios sets this automatically for objects
            }

            try {
                const res = await axios.post(BACKEND_URL, body, { headers });
                return NextResponse.json(res.data);
            } catch (error: any) {
                const status = error.response?.status || 500;
                const data = error.response?.data || { error: error.message };
                return NextResponse.json(data, { status });
            }
        }
    }
}
