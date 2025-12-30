import { createProxy } from "@/lib/api-proxy";
const proxy = createProxy('subjects');
export const GET = proxy.GET;
export const POST = proxy.POST;
