import { ICreateProfessionalDto, IUpdateProfessionalDto, IProfessionalResponseDto } from "../dtos/professional-dto";
import { ProfessionalRepository } from "../repositories/professional-repository";

export class ProfessionalService {
    private professionalRepository: ProfessionalRepository
    constructor() {
        this.professionalRepository = new ProfessionalRepository();
     }
    async create(data: ICreateProfessionalDto): Promise<IProfessionalResponseDto> {
        const professional = await this.professionalRepository.create(data);
        return professional;
    }
    async update(id: string, data: IUpdateProfessionalDto): Promise<IProfessionalResponseDto> {
        const professional = await this.professionalRepository.update(id, data);
        return professional;
    }
    async delete(id: string): Promise<IProfessionalResponseDto> {
        const professional = await this.professionalRepository.delete(id);
        return professional;
    }
    async getAll(): Promise<IProfessionalResponseDto[]> {
        const professionals = await this.professionalRepository.getAll();
        return professionals;
    }
    async getById(id: string): Promise<IProfessionalResponseDto> {
        const professional = await this.professionalRepository.getById(id);
        return professional;
    }
}