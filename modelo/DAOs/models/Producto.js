import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    url: String,
    stock: Number
}, {versionKey: false})


export const ProductoModel = mongoose.model('productos', productoSchema)