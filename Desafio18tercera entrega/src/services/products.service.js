import Services from './services.js'
import logger from '../utils/logger.util.js'

class ProductsServices extends Services {
    constructor(model) { super(model) }

    async getAllProds() {
        const respuesta = await this.getAll()
        return respuesta
    }

    async getProdById(idProd) {
        const respuesta = await this.getById(idProd)
        return respuesta
    }

    async deleteProdById(id) {
        const respuesta = await this.deleteById(id);
        return respuesta
    }

    async create(body) { await this.saveItem(body) }

    async updateById(id, body) {
        try {
            const respuesta = await this.model.updateOne({ _id: id }, {...body })
            return respuesta
        } catch (error) {
            logger.error(error);
        }
    }
}

export default ProductsServices;