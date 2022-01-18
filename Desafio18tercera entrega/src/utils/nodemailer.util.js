import { config } from '../config.js';
import { createTransport } from 'nodemailer';
import logger from './logger.util.js';

const transporterGmail = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.mailUser,
        pass: config.mailPass
    }
});

export const sendGmail = async(receptor, tema, contenido) => {
    const mailOptions = {
        from: 'E-Commerce App <ecommerce.app@gmail.com>',
        to: receptor,
        subject: tema,
        html: contenido
    }
    try {
        const response = await transporterGmail.sendMail(mailOptions);
        return response
    } catch (error) { logger.error(error) }
}