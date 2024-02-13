import { Request, Response } from "express";
import { User } from "../../models/user";
import httpStatus from '../../shared/httpStatus';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Email ou senha inválidos" });
        }

        const jwtKey: string = process.env.JWT_KEY as string; // Casting para o tipo string
        const token = await jwt.sign({ id_user: user.id_user }, jwtKey, { expiresIn: '3h' });
        res.status(200).json({ token, id_user: user.id_user, msg: "Login feito com sucesso" });
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({ err: httpStatus[500] });
    }
}
