const joi = require('joi');

const dataVerification = joi.object({
    title: joi.string().required(),
    price: joi.number().required(),
    thumbnail: joi.string().optional()
})

async function validateData(req, res, next) {
    const { body } = req;
    try {
        await dataVerification.validateAsync(body)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = validateData