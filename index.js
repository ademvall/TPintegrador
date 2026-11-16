import Server from './server.js'
import config from './config.js'
import CnxMongoDB from "./modelo/DAOs/CnxMongoDB.js";


if(config.MODO_PERSISTENCIA == 'MONGO') {
    await CnxMongoDB.conectar()
}

const server = new Server(config.PORT || 8080)
server.start()