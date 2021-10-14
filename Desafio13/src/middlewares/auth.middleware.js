export const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

export const loginMiddleware = (req, res, next) => {
    if (req.body.user) {
        next()
    } else {
        res.redirect('/login')
    }
}