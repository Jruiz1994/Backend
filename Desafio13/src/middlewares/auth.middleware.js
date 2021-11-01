export const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
};

export const cacheControl = (req, res, next) => {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
    }
}