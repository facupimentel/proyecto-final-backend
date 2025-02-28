// POR AQUI SE VAN A COMUNICAR LOS SOCKETS
// socker del backend
import { socketServer } from "../../index.js";
import productsManager from "../data/fs/products.fs.js";

async function socketHelper(socket) {
  console.log("socket id: " + socket.id);
  const products = await productsManager.readAll();

  // socket emite SOLO al socket id
  socket.emit("products", products);
  socket.on("new product", async (data) => {
    await productsManager.create(data);
    const products = await productsManager.readAll();
    // socketServer emite a TODOS los sockets
    socketServer.emit("products", products);
  });
}

export default socketHelper;
