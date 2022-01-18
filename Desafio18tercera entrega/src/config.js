import dotenv from 'dotenv'
dotenv.config()


const {
    MONGOURI,
    PORT,
    SECRET,
    EXPIRE,
    SID,
    TOKEN
} = process.env;

export const config = {
    mailUser: 'jenncoder2021@gmail.com',
    mailPass: 'Coder.2021',
    MONGOURI: MONGOURI,
    PORT: PORT,
    SECRET: SECRET,
    EXPIRE: EXPIRE,
    SID: SID,
    TOKEN: TOKEN,
    mailAdmin: 'storm.777@hotmail.com',
    telAdmin: '+59897410489',
    telFrom: 'whatsapp:+14155238886'
}