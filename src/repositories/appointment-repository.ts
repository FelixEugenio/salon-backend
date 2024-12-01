
import { IAppointmentCreateAndCancelResponseDto, IAppointmentResponseDto, ICreateAppointmentDto, IUpdateAppointmentDto } from "../dtos/appointment-dtos";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AppointmentRepository {
    async create({userId, professionalId, serviceId, scheduleAt}: ICreateAppointmentDto): Promise<IAppointmentCreateAndCancelResponseDto> {
        const appointment = await prisma.appointment.create({
            data: {
                userId,
                professionalId,
                serviceId,
                scheduleAt,
                status: 'PENDING'
            },
            select: {
                id: true,
                scheduleAt: true,
                userId: true,
                professionalId: true,
                serviceId: true,
                status: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        return {
              id: appointment.id,
              scheduleAt: appointment.scheduleAt,
              userId: appointment.userId,
              professionalId: appointment.professionalId,
              serviceId: appointment.serviceId,
              status: appointment.status,
              userName: appointment.user.name,
              userEmail: appointment.user.email
        };
    }

    async getAll(): Promise<IAppointmentResponseDto[]> {
        const appointments = await prisma.appointment.findMany({
            select: {
                id: true,
                scheduleAt: true,
                userId: true,
                professionalId: true,
                serviceId: true,
                status: true,
            }
        });
        return appointments;
    }

    async delete(id: string): Promise<IAppointmentResponseDto> {
        const appointment = await prisma.appointment.delete({
            where: {
                id
            },
            select: {
                id: true,
                scheduleAt: true,
                userId: true,
                professionalId: true,
                serviceId: true,
                status: true
            }
        });
        return appointment;
    }

    async update(id: string, data: IUpdateAppointmentDto): Promise<IAppointmentResponseDto> {
        const appointment = await prisma.appointment.update({
            where: {
                id
            },
            data:{
                scheduleAt: data.scheduleAt,
                userId: data.userId,
                professionalId: data.professionalId,
                serviceId: data.serviceId,
                status: 'PENDING'
            },
            select: {
                id: true,
                scheduleAt: true,
                userId: true,
                professionalId: true,
                serviceId: true,
                status: true,
            }
        });
        return appointment;
    }

    async getOne(id: string): Promise<IAppointmentResponseDto> {
        const appointment = await prisma.appointment.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                scheduleAt: true,
                userId: true,
                professionalId: true,
                serviceId: true,
                status: true
            }
        });
        return appointment;
    }

    async cancel(id: string): Promise<IAppointmentCreateAndCancelResponseDto> {
        const appointment = await prisma.appointment.update({
            where: {
                id
            },
            data: {
                status: 'CANCELED'
            },
            select: {
                id: true,
                scheduleAt: true,
                userId: true,
                professionalId: true,
                serviceId: true,
                status: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        return {
            id: appointment.id,
            scheduleAt: appointment.scheduleAt,
            userId: appointment.userId,
            professionalId: appointment.professionalId,
            serviceId: appointment.serviceId,
            status: appointment.status,
            userName: appointment.user.name,
            userEmail: appointment.user.email
        };
    }

    async findByScheduleAt(scheduleAt: Date): Promise<IAppointmentResponseDto[]> {
        const appointments = await prisma.appointment.findMany({
            where: {
                scheduleAt
            },
            select: {
                id: true,
                scheduleAt: true,
                userId: true,
                professionalId: true,
                serviceId: true,
                status: true
            }
        });
        return appointments;
    }
}