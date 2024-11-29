import { CreateUserDto,LoginUserDto,UpdateUserDto,UserResponseDto } from "../dtos/user-dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class UserRepository {

    //repository para criar usuário
    async create(data: CreateUserDto) : Promise<UserResponseDto> {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                banner: data.banner,
                phoneNumber: data.phoneNumber,
            },
            select: {
                id: true,
                name: true,
                email: true,
                banner: true,
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

    async profile(userId:string): Promise<UserResponseDto> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                banner: true,
                phoneNumber: true,
            }
        });

        return user;
    }


}