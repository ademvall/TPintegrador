import ModelFactory from '../modelo/DAOs/clientes/clientesFactory.js'

import Cliente from '../modelo/Cliente.js'



class Servicio {
    #modelo = null

    constructor(persistencia) {
        this.#modelo = ModelFactory.get(persistencia)
    }

    obtenerClientes = async _ => {
        const clientes = await this.#modelo.obtenerClientes()
        return clientes
    }

    guardarCliente = async cliente => {
        const clienteModelo = new Cliente(cliente)
        
        clienteModelo.validar()

        const clienteGuardado = await this.#modelo.guardarCliente(clienteModelo.get())
        return clienteGuardado
    }
}

export default Servicio