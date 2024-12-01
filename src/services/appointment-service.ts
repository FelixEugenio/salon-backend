import { AppointmentRepository } from "../repositories/appointment-repository";
import { ICreateAppointmentDto, IAppointmentResponseDto,IAppointmentCreateAndCancelResponseDto } from "../dtos/appointment-dtos";

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;
    constructor() {
        this.appointmentRepository = new AppointmentRepository();
    }

    async create(data: ICreateAppointmentDto): Promise<IAppointmentCreateAndCancelResponseDto> {
        return await this.appointmentRepository.create(data);
    }

    async getAll(): Promise<IAppointmentResponseDto[]> {
        return await this.appointmentRepository.getAll();
    }

    async delete(id: string): Promise<IAppointmentResponseDto> {
        return await this.appointmentRepository.delete(id);
    }

    async update(id: string, data: ICreateAppointmentDto): Promise<IAppointmentResponseDto> {
        return await this.appointmentRepository.update(id, data);
    }

    async getOne(id: string): Promise<IAppointmentResponseDto> {
        return await this.appointmentRepository.getOne(id);
    }

    async cancel(id: string): Promise<IAppointmentCreateAndCancelResponseDto> {
        return await this.appointmentRepository.cancel(id);
    }

}