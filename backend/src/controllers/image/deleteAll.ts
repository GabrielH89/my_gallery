import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';
import upload from '../../middleware/multerConfig';
import authAuthentication from '../../middleware/authAuthentication';
import fs from 'fs';
import path from 'path';

export const deleteAllByUser = async (req: Request, res: Response) => {
    try {
        authAuthentication(req, res, async () => {
            const userId = req.id_user;

            // Encontre e exclua todas as imagens associadas ao usuário
            const images = await Image.findAll({ where: { userId } });

            if (images.length === 0) {
                return res.status(404).json({ msg: "Imagens não encontradas para esse usuário deletar" });
            }

            const uploadDirectory = path.resolve(__dirname, '../../../public/uploads');
            const files = await fs.promises.readdir(uploadDirectory);

            // Exclua fisicamente os arquivos
            await Promise.all(files.map(async (file) => {
                const filePath = path.join(uploadDirectory, file);
                await fs.promises.unlink(filePath);
            }));

            // Exclua as entradas das imagens no banco de dados
            await Image.destroy({ where: { userId } });

            res.status(200).json({ msg: "Imagens deletadas com sucesso" });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: httpStatus[500] });
    }
};
