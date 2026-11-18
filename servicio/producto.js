import ModelFactory from '../modelo/DAOs/productos/productosFactory.js'
import Producto from '../modelo/Producto.js'

class Servicio {
    #modelo = null

    constructor(persistencia) {
        this.#modelo = ModelFactory.get(persistencia)
    }
    //_ o ()
    obtenerProductos = async id => {
        if(id) {   
            const producto = await this.#modelo.obtenerProducto(id)
            return producto
        }
        else {
            const productos = await this.#modelo.obtenerProductos()
            return productos
        }    
    }

    guardarProducto = async producto => {
        const productoModelo = new Producto(producto)

        productoModelo.validar()

        const productoGuardado = await this.#modelo.guardarProducto(productoModelo.get())
        return productoGuardado
    }

    actualizarProducto = async (id, producto) => {
        const productoActualizado = await this.#modelo.actualizarProducto(id, producto)
        return productoActualizado
    }

    borrarProducto = async id => {
        const productoEliminado = await this.#modelo.borrarProducto(id)
        return productoEliminado
    }

    calcularPrecioPromedio = async () => {
        const productos = await this.#modelo.obtenerProductos()
        const cant = productos.length
        if (cant == 0) throw new Error('El divisor es Cero')

        const sumatoria = productos.reduce((acc, producto) => acc + producto.precio, 0)
        const promedio = sumatoria / cant
        return +promedio.toFixed(2)
    }


    calcularPrecioSumatoria = async () => {
        const productos = await this.#modelo.obtenerProductos()
        const cant = productos.length
        if (cant == 0) throw new Error('No hay productos para sumar su precio')

        const sumatoria = productos.reduce((acc, producto) => acc + producto.precio, 0)
        return +sumatoria.toFixed(2)
    }


    obtenerPrecioMinimo = async () => {
        const productos = await this.#modelo.obtenerProductos()

        if (productos.length === 0) {
            throw new Error('No hay productos para buscar el precio minimo')
        }
        const productoMin = productos.reduce((menor, producto) => producto.precio < menor.precio ? producto : menor)
        const productoDevuelto = {nombre: productoMin.nombre, precio: productoMin.precio}
        return productoDevuelto
    }

    obtenerPrecioMax = async () => {
        const productos = await this.#modelo.obtenerProductos()

        if (productos.length === 0) {
            throw new Error('No hay productos para buscar el precio maximo')
        }
        const productoMax = productos.reduce((mayor, producto) => producto.precio > mayor.precio ? producto : mayor)
        const productoDevuelto = {nombre: productoMax.nombre, precio: productoMax.precio}
        return productoDevuelto
    }




}

export default Servicio