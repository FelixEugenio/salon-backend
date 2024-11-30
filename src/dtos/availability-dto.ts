export interface ICreateAvailabilityDto {
    date: string;
    time: string;
    serviceId: string;
    userId: string;
}

export interface IUpdateAvailabilityDto {
    date: string;
    time: string;
    serviceId: string;
    userId: string;
}