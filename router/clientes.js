import express from 'express'
import Controlador from '../controlador/clientes.js'


class Router {
    #controlador = null

    constructor(persistencia) {
        this.#controlador = new Controlador(persistencia)
    }

    config() {
        const router = express.Router()

        router.get('/', this.#controlador.obtenerClientes)
        router.post('/registrar', this.#controlador.guardarCliente )

        return router
    }
}

export default Router