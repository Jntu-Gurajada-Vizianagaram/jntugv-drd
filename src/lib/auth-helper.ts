import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jntugv-drd@jntugv';

export function verifyToken(token: string | undefined) {
    if (!token) return null;
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
}
