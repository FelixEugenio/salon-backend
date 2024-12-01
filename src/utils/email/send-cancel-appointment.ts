import { transporter } from "../../config/email-config";
import { CANCEL_APPOINTMENT_EMAIL_TEMPLATE } from "./emailTemplate";

async function sendCancelEmailAppointment(email: string, name: string,appointmentDate: string) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Agendamento Cancelado!",
        html: CANCEL_APPOINTMENT_EMAIL_TEMPLATE(name,appointmentDate),
    };

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }

}

export { sendCancelEmailAppointment };