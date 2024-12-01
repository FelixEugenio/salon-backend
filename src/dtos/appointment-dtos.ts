export interface ICreateAppointmentDto {
    scheduleAt: Date;
    userId: string;
    professionalId: string;
    serviceId: string;
    status: string;
}

export interface IUpdateAppointmentDto {
    scheduleAt?: Date;
    userId?: string;
    professionalId?: string;
    serviceId?: string;
    status?: string;
}

export interface IAppointmentCreateAndCancelResponseDto {
    id: string;
    scheduleAt: Date;
    userId: string;
    professionalId: string;
    serviceId: string;
    status?: string;
    userName: string;
    userEmail: string;
}

export interface IAppointmentResponseDto {
    id: string;
    scheduleAt: Date;
    userId: string;
    professionalId: string;
    serviceId: string;
    status?: string;
}