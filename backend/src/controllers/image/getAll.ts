import { Request, Response } from 'express';
import httpStatus from '../../shared/httpStatus';
import { Image } from '../../models/image';
import upload from '../../middleware/multerConfig';

export const getAll = async (req: Request, res: Response) => {
    try{    
        
        const images = await Image.findAll();

        if(images.length === 0){
            return res.status(404).json({msg: "Não há imagens no banco de dados"});
        }

        return res.status(200).json({msg: images});
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ msg: httpStatus[500] });
    }
}