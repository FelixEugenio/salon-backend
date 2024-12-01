import { transporter } from "../../config/email-config";
import { BLOCK_USER_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate";

async function sendBlockedAccountEmail(email: string, name: string) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Conta Bloqueada",
        html: BLOCK_USER_EMAIL_TEMPLATE(name),
    };

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }

}

export { sendBlockedAccountEmail };