import Server from './server.js'
import config from './config.js'
import CnxMongoDB from "./modelo/DAOs/CnxMongoDB.js";




const server = new Server(config.PORT || 8080, config.MODO_PERSISTENCIA)
server.start()