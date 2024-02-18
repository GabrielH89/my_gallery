import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';
import authAuthentication from '../../middleware/authAuthentication';

export const getAll = async (req: Request, res: Response) => {
    try {
        authAuthentication(req, res, async () => {
            const userId = req.id_user; // Obtém o id_user do middleware de autenticação

            // Buscar todas as imagens associadas ao usuário com o id correspondente
            const images = await Image.findAll({
                where: { userId }
            });

            if (images.length === 0) {
                return res.status(404).json({ msg: "Não há imagens associadas a este usuário" });
            }

            res.status(200).json({ msg: images });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: httpStatus[500] });
    }
}

