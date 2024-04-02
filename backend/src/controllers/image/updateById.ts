import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';
import upload from '../../middleware/multerConfig';
import authAuthentication from '../../middleware/authAuthentication';
import path from 'path';
import fs from 'fs';

export const updateById = async (req: Request, res: Response) => {
    try {
        authAuthentication(req, res, async () => {
            const userId = req.id_user;
            const id_image = req.params.id_image;
            let photo: string | undefined;

            // Verifica se a imagem com o ID especificado existe no banco de dados
            const image = await Image.findOne({
                where: {
                    id_image: id_image,
                    userId: userId
                }
            });

            if (!image) {
                return res.status(404).json({ msg: 'Imagem não encontrada' });
            }

            // Executa o middleware de upload somente se a imagem existir no banco de dados
            upload.single('photo')(req, res, async (err: any) => {
                try {
                    const { title, description } = req.body;

                    if (err) {
                        return res.status(400).json({ error: err.message });
                    }

                    if (!title || !description) {
                        return res.status(400).json({ msg: "Preencha todos os campos" });
                    }

                    if (title.length > 35 || description.length > 255) {
                        return res.status(400).json({ msg: "Caracteres maiores que os permitidos" });
                    }

                    // Se não houver um arquivo enviado, mantenha a foto atual
                    if (!req.file) {
                        photo = image.photo;
                    } else {
                        photo = req.file.filename;

                        // Remove o arquivo antigo
                        const oldImagePath = path.join(__dirname, `../../../public/uploads/${image.photo}`);
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }

                    // Atualiza os campos da imagem no banco de dados
                    await image.update({ title, description, photo });

                    res.status(200).json({ msg: 'Imagem atualizada com sucesso' });
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
}

