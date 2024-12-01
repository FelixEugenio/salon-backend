export interface ICreateAvailabilityDto {
    day: string;
    startTime: string;
    endTime: string;
    professionalId: string;
}

export interface IUpdateAvailabilityDto {
    day?: string;
    startTime?: string;
    endTime?: string;
    professionalId?: string;
}