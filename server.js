import express from 'express'
import RouterProductos from './router/productos.js'
import RouterClientes from './router/clientes.js'
import cors from 'cors'
import CnxMongoDB from './modelo/DAOs/CnxMongoDB.js'


class Server {
    #port = null
    #routerProductos = null
    #routerClientes = null
    #persistencia = null
    #server = null

    constructor(port, persistencia) {
        this.#port = port
        this.#routerProductos = new RouterProductos(persistencia)
        this.#routerClientes = new RouterClientes(persistencia)
        this.#persistencia = persistencia
    }

    async start() {
        const app = express()

        app.use(cors())
        app.use(express.static('public'))
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use('/', this.#routerProductos.config())

        app.use('/clientes', this.#routerClientes.config())

        let persistenciaOK = false

        if (this.#persistencia == 'MONGO') {
            try {
                await CnxMongoDB.conectar()
                persistenciaOK = true
            }
            catch (error) {
                console.log(`Error en la conexión de base de datos: ${error.message}`)
                persistenciaOK = false
            }
        }
        else persistenciaOK = true

        if (persistenciaOK) {
            this.#server = app.listen(this.#port, () => console.log(`Servidor ApiRestful escuchando en http://localhost:${this.#port}`))
            this.#server.on('error', error => console.log('Servidor en error:', error))

        }

        return app
    }

    async stop(){
        if(this.#server){
            this.#server.close()
            await CnxMongoDB.desconectar()
            this.#server = null
        }
    }

}

export default Server