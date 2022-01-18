import twilio from "twilio";
import { config } from '../config.js';
import logger from "./logger.util.js";

const client = twilio(config.SID, config.TOKEN);

export async function sendWhatsapp(to, content) {
    try {
        const message = {
            body: `${content}`,
            from: config.telFrom,
            to: `whatsapp:${to}`,
            // mediaUrl: [
            //     "url de la foto",
            // ],
        };
        const response = await client.messages.create(message);
        return response
    } catch (error) {
        logger.error(error);
    }
}