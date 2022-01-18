import multer from 'multer';
import logger from './logger.util.js';

const storage = multer.diskStorage({

    destination: (req, photo, callback) => callback(null, './public/uploads'),

    filename: (req, photo, callback) => callback(null, photo.originalname)

});

export const upload = multer({ storage })

// Funcion para guardar la imagen en MongoDB

import { UserModel } from '../models/user.model.js';

export const saveImage = async(userId, file) => {

    /*El path real para acceder a la imagen es http://localhost:${port}/uploads/
    Pero photo.path incluye la palabra "public/"
    Por eso "public/" debe ser borrado del path: */

    let realPath = file.path.replace("public", "")
    realPath = realPath.replace(/\\/g, "/")
    try {
        const usuario = await UserModel.findById(userId);
        // Guardar en el documento del usuario de MongoDB el path de la imagen:
        usuario.photo = realPath;
        await usuario.save();
    } catch (error) { logger.error(error) }
}