import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    comprado: false,
    productos: [{
        type: mongoose.Types.ObjectId,
        ref: 'Products'
    }]
}, {
    timestamps: true
})

export const cartsModel = mongoose.model('Carts', cartsSchema)