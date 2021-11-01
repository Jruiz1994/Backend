import faker from 'faker'
faker.locale = 'es'

export const fakerProds = (cant) => {
    const productos = [];
    for (let i = 0; i < cant; i++) {
        const prod = {}
        prod.id = i + 1
        prod.title = faker.commerce.productName()
        prod.price = faker.commerce.price()
        prod.thumbnail = faker.image.image()
        productos.push(prod)
    }
    return productos
}