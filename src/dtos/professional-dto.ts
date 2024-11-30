
export interface ICreateProfessionalDto {
    name:string
    userId:string
    specialty:string
    available:boolean
}

export interface IUpdateProfessionalDto {
    name?:string
    userId?:string
    specialty?:string
    available?:boolean
}

export interface IProfessionalResponseDto {
    id:string
    name:string
    userId:string
    specialty:string
    available:boolean
}