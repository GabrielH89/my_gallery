import { Request, Response } from "express";
import { Image } from "../../models/image";
import httpStatus from "../../shared/httpStatus";

export const getAll = async (req: Request, res: Response) => {
    try{
        const images = await Image.findAll()
        
        if(images.length === 0){
            res.status(404).json({msg: "Imagens não encontrada"});
        }

        return res.status(200).json({images});
    }catch(err) {
        console.log("Error: " + err);
        res.status(500).json({msg: httpStatus[500]});
    }
}
