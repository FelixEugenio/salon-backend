import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const transporter = nodemailer.createTransport({
  host:process.env.EMAIL_HOST, 
  port:process.env.EMAIL_PORT, 
  auth: {
    user:process.env.EMAIL_USER, 
    pass:process.env.EMAIL_PASS ,
  },
});

const mailOptions: nodemailer.SendMailOptions = {
  from: 'EquipeBarber@gmail.com',
  to: 'felixmacarenco@gmail.com',
  subject: 'Novo Cancelamento',
  text: 'Novo Cancelamento de Agendamento',
};

export {transporter,mailOptions}