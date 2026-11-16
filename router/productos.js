import express from 'express';
import ControladorProductos from '../controlador/productos.js'

class RouterProductos {
    #controlador = null

    constructor() {
        this.#controlador = new ControladorProductos()
    }

    config() {
        const router = express.Router()

        router.get('/productos/listar', this.#controlador.obtenerProductos)
        router.get('{/:id}', this.#controlador.obtenerProductos)
        router.get('/productos/estadistica', this.#controlador.obtenerEstadistica)
        router.post('/ingreso', this.#controlador.guardarProducto)
        router.put('/:id', this.#controlador.actualizarProducto)
        router.delete('/:id', this.#controlador.borrarProducto)

        return router
    }
}

export default RouterProductos