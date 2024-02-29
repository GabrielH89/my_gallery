import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { User } from '../../models/user';
import authAuthentication from '../../middleware/authAuthentication';

export const getUser = async (req: Request, res: Response) => {
    try {
        authAuthentication(req, res, async () => {
            const userId = req.id_user; // Corrija aqui para req.params.userId

            if (!userId) {
                return res.status(400).json({ msg: "Parâmetro userId não fornecido" });
            }

            const user = await User.findOne({ where: { id_user: userId } });

            if (!user) {
                return res.status(404).json({ msg: "Usuário não encontrado" });
            }
            return res.status(200).json(user);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: httpStatus[500] });
    }
}
