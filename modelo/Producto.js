import joi from 'joi'

class Producto {
    nombre = null
    precio = null
    descripcion = null
    url = null

    constructor({ nombre, precio, descripcion, url }) {
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.url = url
    }

    validar() {
        const schemaProducto = joi.object({
            nombre: joi.string().min(1).max(50).required(),
            precio: joi.number().integer().min(0).required(),
            descripcion: joi.string().min(1).required(),
        })


        const { error } = schemaProducto.validate({
            nombre: this.nombre,
            precio: this.precio,
            descripcion: this.descripcion,
        });

        if (error) throw new Error(error)
    }


get(){
    return {
        nombre: this.nombre,
        precio: parseInt(this.precio),
        descripcion: this.descripcion,
        url: this.url
    }
}

}


export default Producto