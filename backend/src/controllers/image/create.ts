import { Request, Response } from "express";
import { Image } from "../../models/image";
import httpStatus from "../../shared/httpStatus";

export const create = async (req: Request, res: Response) => {
    try {
        const {photo, description} = req.body;
    }catch(err) {
        console.log("Error: " + err);
        res.status(500).json({msg: httpStatus[500]});
    }
}
