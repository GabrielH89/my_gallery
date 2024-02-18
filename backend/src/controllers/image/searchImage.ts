import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';

export const searchImageByTitle = async (req: Request, res: Response) => {
    try{
        const images = await Image.findAll({
            order: [
                ['title', 'ASC']
            ]
        });

        if(images.length === 0) {
            return res.status(404).json({msg: "Não há imagem "});
        }

        const titleSearch = req.body.title;

        if (!titleSearch) {
            return res.status(400).json({ msg: "Por favor, forneça um título para pesquisa" });
        }

        let inicio = 0;
        let fim = images.length - 1;
        let found = false;

        while(inicio <= fim){
            const middle = (Math.floor(inicio + fim) / 2);
            if(images[middle].title === titleSearch){
                found = true;
                return res.status(200).json({msg: images[middle]});
            }else if(images[middle].title > titleSearch){
                fim = middle - 1;
            }else{
                inicio = middle + 1;
            }
        }
        
        if(!found){
            return res.status(404).json({msg: "Título não encontrado"});
        }
         
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ msg: httpStatus[500] });
    }
}
