export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    banner?: string;
    phoneNumber: string;
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    banner?: string;
    phoneNumber?: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UserResponseDto {
    id: string;
    name: string;
    email: string;
    banner?: string;
    phoneNumber: string;
}

export interface PayloadDto {
    sub: string;
}