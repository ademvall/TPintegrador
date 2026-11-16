import fs from 'fs'

class ModeloFile {
    #nombreArchivo = null

    constructor() {
        this.#nombreArchivo = 'productos.json'
    }

    #leerArchivo = async () => {
        let productos = []
        try {
            productos = JSON.parse(await fs.promises.readFile(this.#nombreArchivo, 'utf-8'))
        }
        catch { }

        return productos
    }

    #escribirArchivo = async productos => {
        await fs.promises.writeFile(this.#nombreArchivo, JSON.stringify(productos, null, '\t'))
    }


    obtenerProductos = async () => {
        const productos = await this.#leerArchivo()
        return productos
    }
 
    guardarProducto = async producto => {
        const productos = await this.#leerArchivo()
        productos.push(producto)
        await this.#escribirArchivo(productos)
        return producto
    }


}

export default ModeloFile