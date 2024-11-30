import { ICreateServiceDto,IServiceResponseDto,IUpdateServiceDto } from "../dtos/service-dto";
import { ServiceRepository } from "../repositories/service-repository";

export class ServiceService {
    private serviceRepository : ServiceRepository;

    constructor(){
        this.serviceRepository = new ServiceRepository();
    }
    async create(data:ICreateServiceDto):Promise<IServiceResponseDto>{
        return await this.serviceRepository.create(data);
    }

    async getAll():Promise<IServiceResponseDto[]>{
        return await this.serviceRepository.getAll();
    }

    async getById(id:string):Promise<IServiceResponseDto>{
        return await this.serviceRepository.getById(id);
    }

    async update(id:string,data:IUpdateServiceDto):Promise<IServiceResponseDto>{
        return await this.serviceRepository.update(id,data);
    }

    async delete(id:string){
        return await this.serviceRepository.delete(id);
    }
}