import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        console.log("Mail Information:", body.name, body.email, body.message);

        console.log("Contact Form Submission:", body);

        console.log("SMTP Configuration:", {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        });

        await transporter.sendMail({
            from: `"${body.name}" <${body.email}>`,
            to: process.env.CONTACT_EMAIL,
            subject: `New Contact Form Submission from ${body.name}`,
            text: body.message,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Message:</strong></p>
                <p>${body.message}</p>
            `,
        });

        console.log("Contact Form Submission:", body);

        return NextResponse.json({ message: 'Message sent successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
    }
}
