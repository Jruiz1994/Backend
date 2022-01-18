import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    stock: {
        type: Number,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
}, {
    timestamps: false
})

export const productsModel = mongoose.model('Products', productsSchema)