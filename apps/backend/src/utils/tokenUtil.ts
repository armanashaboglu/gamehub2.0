import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'Armie101';

const expiresIn = '1d';

const tokenBlacklist = new Set<string>();
export const blacklistToken = (token: string) => tokenBlacklist.add(token);


export const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.log('Error verifying token: ', error);
        throw new Error('Invalid or expired token');
    }
};

