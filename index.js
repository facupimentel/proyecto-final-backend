import "dotenv/config.js"
import express from "express";
import {createServer} from "http"
import {Server as SocketServer} from "socket.io"
import router from "./src/router/index.router.js";
import { engine } from "express-handlebars";
import connectMongo from "./src/helpers/mongo.helper.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import socketHelper from "./src/helpers/socket.helper.js";

// AQUI SOLO CONFIGURACIONES DEL SERVIDOR
// ESTO ES LOGICA DE SERVIDOR


// express server settings
const server = express(); // ejecutando el modulo de express se crea un servidor con muchas mas configuraciones que el de la clase pasada con http.createServer()
const port = process.env.PORT
const ready = () =>{ 
    console.log("server ready on port " + port)
    connectMongo(process.env.MONGO) // conexion a mongo
};
const httpServer = createServer(server); // creamos un servidor http con las configuraciones de express
httpServer.listen(port, ready); // levantamos el servidor httpServer hecho con node con las configuraciones de express

// socket server settings

const socketServer = new SocketServer(httpServer); // creamos un servidor de sockets con las configuraciones del servidor http
socketServer.on('connection', socketHelper) // con el metodo on de socketServer levantamos el servidor de sockets
export {socketServer} // exportamos el servidor de sockets para poder usarlo en otros archivos para la comunicacion en tiempo real


// TEMPLATE ENGINE
// con esto configuramos el motor de plantillas
server.engine("handlebars", engine()); // guardamos un motor en la propiedad handlebars
server.set("view engine", "handlebars"); // configurando el motor de vistas de handlebars
server.set("views", "./src/views"); //configuramos la ruta donde estan todas las plantillas


/* middlewares*/
server.use(morgan("dev"));
server.use("/assets", express.static("assets"));
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


/* ROUTERS */
server.use("/", router);
server.use(errorHandler); // maneja los errores que hayan en el codigo
server.use(pathHandler); // maneja el error de cualquier ruta que no exista