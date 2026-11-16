import ModeloFile from './productosFile.js'
import ModeloMongoDB from './productosMongoDB.js'

class ModeloFactory {
    static get(tipo) {
        switch (tipo) {
            case 'FILE':
                console.log('-----Usando Modelo de persistencia en Archivo-----')
                return new ModeloFile()

            case 'MONGO':
                console.log('*** Persistiendo en base de datos MongoDB ***')
                return new ModeloMongoDB()

            default:
                console.log('-----Usando Modelo de persistencia en Archivo-----')
                return new ModeloFile()
        }
    }

}

export default ModeloFactory