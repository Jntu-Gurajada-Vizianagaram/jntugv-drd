import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Here you would typically send an email or save to DB.
        // For demo, we just log and return success.
        console.log("Contact Form Submission:", body);

        return NextResponse.json({ message: 'Message sent successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
    }
}
