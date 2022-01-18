import logger from "../utils/logger.util.js";
class Services {
    constructor(model) { this.model = model }

    async getAll() {
        try {
            const respuesta = await this.model.find()
            return respuesta
        } catch (error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const respuesta = await this.model.findOne({ _id: id })
            return respuesta
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteById(id) {
        try {
            const respuesta = await this.model.deleteOne({ _id: id })
            return respuesta
        } catch (error) {
            logger.error(error);
        }
    }

    async saveItem(body) {
        try {
            const respuesta = await this.model.create(body)
            return respuesta
        } catch (error) {
            logger.error(error);
        }
    }
}

export default Services;