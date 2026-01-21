import { createProxy } from '@/lib/api-proxy';

const proxy = createProxy('downloads');

export const GET = proxy.GET;
export const POST = proxy.POST;
