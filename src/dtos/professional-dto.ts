
export interface ICreateProfessionalDto {
    name:string
    specialty:string
    available:boolean
}

export interface IUpdateProfessionalDto {
    name?:string
    specialty?:string
    available?:boolean
}

export interface IProfessionalResponseDto {
    id:string
    name:string
    specialty:string
    available:boolean
}