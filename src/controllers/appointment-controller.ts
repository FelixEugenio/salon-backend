import { AppointmentService } from "../services/appointment-service";
import { Request, Response } from "express";
import { ICreateAppointmentDto, IAppointmentResponseDto ,IAppointmentCreateAndCancelResponseDto} from "../dtos/appointment-dtos";
import { sendCancelEmailAppointment } from "../utils/email/send-cancel-appointment";
import { sendAppointmentConfirmationEmail } from "../utils/email/send-confirmation-mail";

const appointmentService = new AppointmentService();
export class AppointmentController {
    async create(req: Request, res: Response) {
        const data: ICreateAppointmentDto = req.body;
        const appointment: IAppointmentCreateAndCancelResponseDto = await appointmentService.create(data);

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