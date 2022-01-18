import { saveImage } from '../utils/multer.util.js'
import { sendGmail } from '../utils/nodemailer.util.js';
import { config } from '../config.js';
import logger from '../utils/logger.util.js';

const usuarioAdmin = config.mailAdmin

export function login(req, res) {
    try {
        if (req.isAuthenticated()) {
            const user = req.user
            res.status(200).send(user)
        }
    } catch (error) {
        logger.error(error)
    }
}

export function getFailLogin(req, res) {
    res.status(400).send({ error: "Login failed" })
}

export async function signup(req, res) {
    const { username, name, email, address, telephone, age, _id } = req.user
    let contenidoMail = `<h3>Nuevo registro en la plataforma</h3> <p> Usuario: ${username} </p> <p> Nombre: ${name} </p> <p> Email: ${email}</p> <p> Dirección: ${address} </p> <p> Teléfono: ${telephone} </p> <p> Edad: ${age} </p>`
    try {
        await sendGmail(usuarioAdmin, 'Nuevo registro', contenidoMail)
        if (req.file) await saveImage(_id, req.file);
        res.status(200).send(req.user)
    } catch (error) { logger.error(error) }
}

export function getFailSignup(req, res) {
    res.status(400).send("Signup failed")
}

export function logout(req, res) {
    req.session.destroy();
    res.send('ok')
}

export function getImage(req, res) {
    try {
        if (req.isAuthenticated()) {
            const user = req.user
            res.status(200).send(user.photo)
        } else {
            res.status(401).send('No estas logueado')
        }
    } catch (error) {
        logger.error(error);
    }
}

export function getUserData(req, res) {
    try {
        if (req.isAuthenticated()) {
            const user = req.user
            res.status(200).send(user)
        } else {
            res.status(401).send('No estas logueado')
        }
    } catch (error) {
        logger.error(error);
    }
}