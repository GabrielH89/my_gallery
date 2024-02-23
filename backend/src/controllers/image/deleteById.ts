import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';
import authAuthentication from '../../middleware/authAuthentication';
import path from 'path';
import fs from 'fs';

export const deleteById = async (req: Request, res: Response) => {
    try{
        authAuthentication(req, res, async () => {
            const userId = req.id_user;
            const id_image = req.params.id_image;
            
            const image = await Image.findOne({
                where: {
                    id_image: id_image,
                    userId: userId
                }
            });

            if(!image){
                return res.status(404).json({ msg: 'Imagem não encontrada' });
            }

            const imagePath = path.join(__dirname, `../../../public/uploads/${image.photo}`);

            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
            }

            await Image.destroy({where: {id_image}});

            return res.status(200).json({msg: "Imagem deletada com sucesso "});
        });

    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ msg: httpStatus[500] });
    }
}