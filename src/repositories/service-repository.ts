import { ICreateServiceDto,IUpdateServiceDto,IServiceResponseDto } from "../dtos/service-dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class ServiceRepository{

    async create(data:ICreateServiceDto):Promise<IServiceResponseDto>{
        const service = await prisma.service.create({
            data,
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true
            }
        });
        return service;
    }

    async getAll():Promise<IServiceResponseDto[]>{
        const services = await prisma.service.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true
            }
        });
        return services;
    }

    async getById(id:string):Promise<IServiceResponseDto>{
        const service = await prisma.service.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true
            }
        });
        return service;
    }

    async delete(id:string){
        const service = await prisma.service.delete({
            where: {
                id
            }
        });
        return service;
    }

    async update(id:string,data:IUpdateServiceDto):Promise<IServiceResponseDto>{
        const service = await prisma.service.update({
            where: {
                id
            },
            data,
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true
            }
        });
        return service;
    }

}