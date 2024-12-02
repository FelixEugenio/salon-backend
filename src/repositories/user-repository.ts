import { ICreateUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user-dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class UserRepository {

    //repository para criar usuário
    async create(data: ICreateUserDto) : Promise<IUserResponseDto> {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                avatar: data.avatar,
                phoneNumber: data.phoneNumber,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true,
            }
        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        return user;
    }

    async profile(userId:string): Promise<IUserResponseDto> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true,
            }
        });

        return user;
    }

    async delete(userId:string) {
      const user =  await prisma.user.delete({
            where: {
                id: userId,
            }
        });

        return user;
    }

    async update(userId:string,data:IUpdateUserDto) : Promise<IUserResponseDto> {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                avatar: data.avatar,
                phoneNumber: data.phoneNumber,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true,
            }
        });

        return user;
    }

    async findById(userId:string){
       const user = await prisma.user.findFirst({
        where:{
            id:userId
        }
       })

       return user;
    }

    async blockUser(userId:string) : Promise<IUserResponseDto> {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                blocked: true,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true,
            }
        });

        return user;
    }

    async unBlockedUser(userId:string) : Promise<IUserResponseDto> {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                blocked: false,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true,
            }
        });

        return user;
    }

    async getAllUsers() : Promise<IUserResponseDto[]> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true,
            }
        });

        return users;
    }
}