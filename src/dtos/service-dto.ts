export interface ICreateServiceDto {
    name: string;
    description: string;
    price: number;
    duration: number;
}

export interface IUpdateServiceDto {
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
}

export interface IServiceResponseDto {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
}
