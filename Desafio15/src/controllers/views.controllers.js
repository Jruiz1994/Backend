import { fakerProds } from '../utils/faker.utils.js';

const productsView = (req, res) => {
    const productos = fakerProds(5);
    res.render('bodyProducts', {
        layout: 'marcoLogueado',
        productos,
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
        email: req.user.emails[0].value
    });
}

const loginView = (req, res) => {
    res.render('login', {
        layout: 'marcoDeslogueado',
    })
}
const logoutView = (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user.displayName;
        req.logout()
        res.render('logout', {
            layout: 'marcoDeslogueado',
            user
        })
    } else {
        res.redirect('/login')
    }
}

export { productsView, loginView, logoutView }