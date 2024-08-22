import { Request, Response } from "express";
import { User } from "../../models/user";
import httpStatus from '../../shared/httpStatus';
import bcrypt from 'bcrypt';
import validator from 'validator';

export const signUp = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;

        if(name === "" || email === "" || password === ""){
            return res.status(400).json({error: httpStatus[400]});
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Este email já está em uso.' });
        }
        
        if(!validator.isEmail(email)){
            return res.status(400).json({msg: "E-mail inválido, insira um e-mail que seja válido."})
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name, email, password: hashedPassword
            })

            res.status(201).json({msg: "User created with success"});
        } 
        
    }catch(err) {
        console.log("Ocurred this error: " + err);
        res.status(500).json({err: httpStatus[500]});
    }
}

