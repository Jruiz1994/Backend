async function validateAdmin(req, res, next) {
    const { headers } = req
    if (JSON.parse(headers.admin) == true) {
        next();
    } else {
        res.send({ error: "Usuario no autorizado" });
        throw new Error("El usuario no es admin.");
    }
}

export default { validateAdmin }