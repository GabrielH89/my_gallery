// authAuthentication.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import httpStatus from '../shared/httpStatus';

// Estendendo a interface Request do Express para incluir a propriedade id_user
declare global {
    namespace Express {
        interface Request {
            id_user?: string;
        }
    }
}

const jwtKey = process.env.JWT_KEY as Secret;

const verifyToken = (token: string): Promise<JwtPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as JwtPayload);
            }
        });
    });
};

const authAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decodedToken = await verifyToken(token);
        req.id_user = decodedToken.id_user; // Adiciona o ID do usuário à requisição
        next();
    } catch (error) {
        console.error('Erro de autenticação:', error);
        res.status(401).json({ message: 'Falha na autenticação. Token inválido ou expirado.' });
    }
};

export default authAuthentication;
