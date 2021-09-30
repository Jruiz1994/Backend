class Services {
    constructor(model) { this.model = model }

    async getAll() {
        try {
            const respuesta = await this.model.find()
            console.log(respuesta);
            return respuesta
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const respuesta = await this.model.findOne({ _id: id })
            console.log(respuesta);
            return respuesta
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const respuesta = await this.model.deleteOne({ _id: id })
            console.log(respuesta);

            return respuesta
        } catch (error) {
            console.log(error);
        }
    }

    async saveItem(body) {
        try {
            const respuesta = await this.model.create(body)
            console.log(respuesta);
            return respuesta
        } catch (error) {
            console.log(error);
        }
    }
}

export default Services;