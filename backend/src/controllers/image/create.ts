import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';
import upload from '../../middleware/multerConfig';
import authAuthentication from '../../middleware/authAuthentication'; // Importe o middleware de autenticação

interface MulterFileWithBase64 extends Express.Multer.File {
    base64Data?: string;
}

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
                        return res.status(400).json({ error: 'Nenhuma foto carregada' });
                    }

                    const { title, description } = req.body;
                    const photo: string = req.file.filename;
                    // Obtém o id_user do middleware de autenticação
                    const userId = req.id_user; 

                    if(!title || !photo || !description){
                        return res.status(400).json({msg: "Preencha todos os campos"});
                    }
                    // Construir a URL completa da imagem

                    if(title.length > 35 || description.length > 255) {
                        return res.status(400).json({msg: "Caracteres maiores que os permitidos"});
                    }
                    
                    console.log("Title length: ", title.length);
                    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

                    const newImage = await Image.create({
                        title, description, photo, userId,
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


