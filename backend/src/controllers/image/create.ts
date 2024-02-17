// imageController.ts
import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';
import upload from '../../middleware/multerConfig';
import authAuthentication from '../../middleware/authAuthentication'; // Importe o middleware de autenticação

export const create = async (req: Request, res: Response) => {
    try {
        // Verifica se o usuário está autenticado antes de continuar
        authAuthentication(req, res, async () => {
            upload.single('photo')(req, res, async (err: any) => {
                try {
                    if (err) {
                        return res.status(400).json({ error: err.message });
                    }

                    if (!req.file) {
                        return res.status(400).json({ error: 'No file uploaded' });
                    }

                    const { title, description } = req.body;
                    const photo: string = req.file.path;
                    const userId = req.id_user; // Obtém o id_user do middleware de autenticação

                    const newImage = await Image.create({
                        title,
                        description,
                        photo,
                        userId
                    });

                    res.status(201).json({ message: 'Image criada com sucesso', newImage });
                } catch (error) {
                    console.error('Error:', error);
                    res.status(500).json({ msg: httpStatus[500] });
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: httpStatus[500] });
    }
};

export default create;
