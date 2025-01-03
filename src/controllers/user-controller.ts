import { Request,Response } from "express";
import { UserService } from '../services/user-service';
import { ICreateUserDto, ILoginUserDto, IUpdateUserDto } from "../dtos/user-dto";
import { sendWelcomeEmail } from "../utils/email/send-welcome-email";
import { sendBlockedAccountEmail } from "../utils/email/send-blocked-account-email";
import { sendUnBlockedAccountEmail } from "../utils/email/send-unblocked-account-email";
import { uploadUserAvatar } from "../utils/cloudinary/cloudinary";
import { cookieConfig } from "../config/cookie-config";


const userService = new UserService();
export class UserController{
    async register(req:Request,res:Response){

        const userData:ICreateUserDto = req.body;
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
        const loginData:ILoginUserDto = req.body;
        const token = await userService.login(loginData);

        res.cookie('auth_token',token,cookieConfig);
        
        return res.status(200).json(token);
    }

    async delete(req:Request,res:Response){
        const userId = req.params.id;
        const user = await userService.delete(userId);
        return res.status(200).json(user);
    }

    async update(req:Request,res:Response){
        const userId = req.params.id;
        const file = req.file;

        const userData:IUpdateUserDto = req.body;

        if(file){
            const imageUrl = await uploadUserAvatar(file.path);
            userData.avatar = imageUrl;
        }
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
        await sendUnBlockedAccountEmail(user.email,user.name);
        return res.status(200).json(user);
    }

    async getAllUsers(req:Request,res:Response){
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    }

    async logout(req:Request,res:Response){
        res.clearCookie('auth_token');
        return res.status(200).json({message:"Logout successfully"});
    }
}