import { transporter } from "../../config/email-config";
import { WELCOME_EMAIL_TEMPLATE } from "./emailTemplate";

async function sendWelcomeEmail(email: string, name: string) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Bem-vindo a nossa Plataforma!",
        html: WELCOME_EMAIL_TEMPLATE(name),
    };

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }

}

export { sendWelcomeEmail };