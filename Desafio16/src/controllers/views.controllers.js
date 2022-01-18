import { fakerProds } from '../utils/faker.utils.js';
import logger from '../utils/logger.utils.js';

const productsView = (req, res) => {
    try {
        const productos = fakerProds(5);

        res.render('bodyProducts', {
            layout: 'marcoLogueado',
            productos,
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
            email: req.user.emails[0].value
        })
    } catch (err) {
        logger.error(err)
    }
}

const loginView = (req, res) => {
    try {
        res.render('login', {
            layout: 'marcoDeslogueado',
        })
    } catch (err) {
        logger.error(err)
    }
}
const logoutView = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user.displayName;
        logger.info(`Nombre del usuario: ${req.user.displayName}`)
        req.logout()
        res.render('logout', {
            layout: 'marcoDeslogueado',
            user
        })
    } else {
        const err = 'Error al obtener los datos del usuario';
        logger.error(err);
        res.redirect('/login')
    }
}

export { productsView, loginView, logoutView }