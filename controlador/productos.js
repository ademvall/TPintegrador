import ServicioProductos from "../servicio/producto.js"

class ControladorProductos {
    #servicio = null

    constructor() {
        this.#servicio = new ServicioProductos()
    }


    obtenerProductos = async (req,res) => {
        try {
            const { id } = req.params
            const producto_s = await this.#servicio.obtenerProductos(id)
            res.json(producto_s)
        }
        catch(error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    guardarProducto = async (req, res) => {
        try {
            const producto = req.body

            // ---------- Validación genérica -----------
            if (Object.keys(producto).length == 0) throw new Error('El producto está vacío')

            const productoGuardado = await this.#servicio.guardarProducto(producto)
            //res.json(productoGuardado)    
            res.redirect('/')
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    actualizarProducto = async (req, res) => {
        try {
            const { id } = req.params
            const producto = req.body
            const productoActualizado = await this.#servicio.actualizarProducto(id, producto)
            res.json(productoActualizado)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    borrarProducto = async (req, res) => {
        try {
            const { id } = req.params
            const productoEliminado = await this.#servicio.borrarProducto(id)
            res.json(productoEliminado)
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }

    obtenerEstadistica = async (req, res) => {
        try {
            const precioPromedio = await this.#servicio.calcularPrecioPromedio()
            const precioSumatoria = await this.#servicio.calcularPrecioSumatoria()
            const precioMin = await this.#servicio.obtenerPrecioMinimo()
            const precioMax = await this.#servicio.obtenerPrecioMax()
            res.json({ precioPromedio, precioSumatoria, precioMin, precioMax })
        }
        catch (error) {
            res.status(500).json({ url: req.url, method: req.method, error: error.message })
        }
    }
}

export default ControladorProductos