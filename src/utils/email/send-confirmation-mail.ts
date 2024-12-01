import { transporter } from "../../config/email-config";
import { APPOINTMENT_CONFIRMATION_EMAIL_TEMPLATE } from "./emailTemplate";

async function sendAppointmentConfirmationEmail(email: string, name: string,appointmentDate: string) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Agendamento Confirmado!",
        html: APPOINTMENT_CONFIRMATION_EMAIL_TEMPLATE(name,appointmentDate),
    };

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }

}

export { sendAppointmentConfirmationEmail };