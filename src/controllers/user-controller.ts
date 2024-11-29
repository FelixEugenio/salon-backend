import { Request,Response } from "express";
import { UserService } from '../services/user-service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../dtos/user-dto";
import { sendWelcomeEmail } from "../utils/email/send-welcome-email";
import { sendBlockedAccountEmail } from "../utils/email/send-blocked-account-email";

const userService = new UserService();
export class UserController{

    async register(req:Request,res:Response){

        const userData:CreateUserDto = req.body;
        const user = await userService.create(userData);
        await sendWelcomeEmail(user.email,user.name);

        return res.status(201).json(user);
    }

    async profile(req:Request,res:Response){
        const userId = req.params.id;
        console.log(userId);
        const user = await userService.profile(userId);
        return res.status(200).json(user);
    }

    async login(req:Request,res:Response){
        const loginData:LoginUserDto = req.body;
        const token = await userService.login(loginData);
        return res.status(200).json(token);
    }

    async delete(req:Request,res:Response){
        const userId = req.params.id;
        const user = await userService.delete(userId);
        return res.status(200).json(user);
    }

    async update(req:Request,res:Response){
        const userId = req.params.id;
        const userData:UpdateUserDto = req.body;
        const user = await userService.update(userId,userData);
        return res.status(200).json(user);
    }

    async blockedUser(req:Request,res:Response){
        const userId = req.params.id;
        const user = await userService.blockedUser(userId);
        await sendBlockedAccountEmail(user.email,user.name);
        return res.status(200).json(user);
    }

    async unBlockedUser(req:Request,res:Response){
        const userId = req.params.id;
        const user = await userService.unBlockedUser(userId);
        return res.status(200).json(user);
    }
}