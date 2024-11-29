import { Request,Response } from "express";
import { UserService } from '../services/user-service';
import { CreateUserDto } from "../dtos/user-dto";

const userService = new UserService();
export class UserController{
    
    async register(req:Request,res:Response){
        
        const userData:CreateUserDto = req.body;
        const user = await userService.create(userData);

        return res.status(201).json(user);
    }
}