import { AppointmentService } from "../services/appointment-service";
import { Request, Response } from "express";
import { ICreateAppointmentDto, IAppointmentResponseDto ,IAppointmentCreateAndCancelResponseDto} from "../dtos/appointment-dtos";
import { sendCancelEmailAppointment } from "../utils/email/send-cancel-appointment";
import { sendAppointmentConfirmationEmail } from "../utils/email/send-confirmation-mail";
import { ConflictError } from "../utils/error/error-types";
import { isValidDate } from "../utils/validation/is-valid-date";


const appointmentService = new AppointmentService();
export class AppointmentController {
    async create(req: Request, res: Response) {
        const data: ICreateAppointmentDto = req.body;

        const scheduleAt = data.scheduleAt;

        if (!isValidDate(scheduleAt)) {
            throw new ConflictError("Data inválida ou hora inválida.");
        }

        const verifyIfAppointmentAlreadyExists = await appointmentService.findByScheduleAt(new Date(data.scheduleAt));

        if (verifyIfAppointmentAlreadyExists.length > 0) {
            throw new ConflictError("Já existe um agendamento para essa data.");
        }

        const appointment: IAppointmentCreateAndCancelResponseDto = await appointmentService.create(data);

        const currentDate = new Date();

        const appointmentDate = new Date(appointment.scheduleAt);

        if (appointmentDate <= currentDate) {
            throw new ConflictError("A data do agendamento não pode ser menor que a data atual.");
        }

        const fromattedDate = new Date(appointment.scheduleAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric',hour: '2-digit', minute: '2-digit', second: '2-digit' });

        await sendAppointmentConfirmationEmail(appointment.userEmail, appointment.userName,fromattedDate);
        return res.status(201).json(appointment);
    }

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const data: ICreateAppointmentDto = req.body;
        const appointment = await appointmentService.update(id, data);
        return res.status(200).json(appointment);
    }

    async getOne(req: Request, res: Response) {
        const id = req.params.id;
        const appointment = await appointmentService.getOne(id);
        return res.status(200).json(appointment);
    }

    async cancel(req: Request, res: Response) {
        const id = req.params.id;
        const appointment: IAppointmentCreateAndCancelResponseDto= await appointmentService.cancel(id);
        const fromattedDate = new Date(appointment.scheduleAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric',hour: '2-digit', minute: '2-digit', second: '2-digit' });
        await sendCancelEmailAppointment(appointment.userEmail, appointment.userName,fromattedDate);
        return res.status(200).json(appointment);
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        const appointment = await appointmentService.delete(id);
        return res.status(200).json(appointment);
    }

    async getAll(req: Request, res: Response) {
        const appointments = await appointmentService.getAll();
        return res.status(200).json(appointments);
    }
}