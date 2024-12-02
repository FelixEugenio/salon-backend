import { ICreateProfessionalDto, IUpdateProfessionalDto, IProfessionalResponseDto } from "../dtos/professional-dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProfessionalRepository {
    async create(data: ICreateProfessionalDto): Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.create({
            data,
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar:true
            },
        });
        return professional;
    }

    async update(id: string, data: IUpdateProfessionalDto): Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.update({
            where: {
                id,
            },
            data,
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar:true
            },
        });
        return professional;
    }

    async getById(id: string): Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar:true
            },
        });
        return professional;
    }

    async getAll(): Promise<IProfessionalResponseDto[]> {
        const professionals = await prisma.professional.findMany({
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar:true
            },
        });
        return professionals;
    }

    async delete(id: string): Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.delete({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar:true
            },
        });
        return professional;
    }
}
