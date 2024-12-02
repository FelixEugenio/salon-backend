
export interface ICreateProfessionalDto {
    name:string
    specialty:string
    available:boolean
    avatar?:string
}

export interface IUpdateProfessionalDto {
    name?:string
    specialty?:string
    available?:boolean
    avatar?:string
}

export interface IProfessionalResponseDto {
    id:string
    name:string
    specialty:string
    available:boolean
    avatar?:string
}