import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken";

interface IPayloadDto{
    sub: string
    role: string
}
export async function isAdmin(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Token not found"});
    }
    const [ ,token] = authHeader.split(" ");
    try{
        const decoded = verify(token,process.env.JWT_SECRET) as IPayloadDto;
        
        if(decoded.role !== "ADMIN"){
            return res.status(401).json({message:"Unauthorized"});
        }

        req.userId = decoded.sub;

       return next();
       
    }catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
}