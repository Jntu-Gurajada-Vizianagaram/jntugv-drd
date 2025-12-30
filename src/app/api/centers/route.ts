import { createProxy } from "@/lib/api-proxy";
const proxy = createProxy('centers');
export const GET = proxy.GET;
export const POST = proxy.POST;
