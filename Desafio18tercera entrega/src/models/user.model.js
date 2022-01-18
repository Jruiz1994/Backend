import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    carts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts'
    }]

}, { timestamps: true })

export const UserModel = mongoose.model('User', Schema)