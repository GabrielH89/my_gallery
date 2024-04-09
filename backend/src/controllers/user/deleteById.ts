import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';
import { User } from '../../models/user';
import authAuthentication from '../../middleware/authAuthentication';
import path from 'path';
import fs from 'fs';

export const deleteById = async (req: Request, res: Response) => {
    try{
        authAuthentication(req, res, async () => {
            const userId = req.id_user;

            const images = await Image.findAll({where: {userId}});

            const uploadDirectory = path.resolve(__dirname, '../../../public/uploads');

            // Exclua fisicamente os arquivos associados ao usuário
            await Promise.all(images.map(async (image) => {
                const filePath = path.join(uploadDirectory, image.photo);
                // Verifique se o arquivo existe antes de excluí-lo
                if (fs.existsSync(filePath)) {
                    try {
                        await fs.promises.unlink(filePath);
                    } catch (error) {
                        console.error('Erro ao excluir arquivo:', error);
                    }
                }
            }));

            await Image.destroy({where: {userId}});
            await User.destroy({where: {id_user: userId}});
            
            res.status(200).json({msg: "Conta excluída com sucesso!"});
        })
    }catch(error) {
        console.log("Error: " + error);
        return res.status(500).json({msg: httpStatus[500]});
    }
}