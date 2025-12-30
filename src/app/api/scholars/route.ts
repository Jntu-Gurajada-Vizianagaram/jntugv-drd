import { createProxy } from "@/lib/api-proxy";
const proxy = createProxy('scholars');
export const GET = proxy.GET;
export const POST = proxy.POST;
