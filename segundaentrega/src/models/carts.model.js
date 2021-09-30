import mongoose from "mongoose";
// import { productsSchema } from './products.model.js'

const cartsSchema = new mongoose.Schema({
    productos: [{
        type: mongoose.Types.ObjectId,
        ref: 'Products'
    }]
}, {
    timestamps: true
})

export const cartsModel = mongoose.model('Carts', cartsSchema)