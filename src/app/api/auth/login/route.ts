import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_USER = {
    id: "drd_jntugv_admin",
    name: 'Admin DR&D',
    email: 'dr@jntugv.edu.in',
    password: 'Admin@123'
};

const JWT_SECRET = process.env.JWT_SECRET || 'Jntugv@DR&D';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
            const token = jwt.sign({ id: ADMIN_USER.id, name: ADMIN_USER.name, email: ADMIN_USER.email }, JWT_SECRET, {
                expiresIn: '24h'
            });
            return NextResponse.json({ token, message: 'Login successful' });
        }

        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
