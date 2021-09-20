import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    productos: [{
        ref: 'Products',
        type: mongoose.Schema.Types.ObjectId,
    }]
}, {
    timestamps: true
})

export default mongoose.model('Carts', cartsSchema)