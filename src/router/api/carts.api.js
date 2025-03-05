import { Router } from "express";
import {
  addProductToCart,
  readProductByUser,
  updateQuantity,
  removeProductByCart,
  clearCart,
} from "../../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.post("/", addProductToCart)
cartsRouter.get("/users/:user_id", readProductByUser)
cartsRouter.put("/:cart_id", updateQuantity)
cartsRouter.delete("/:cart_id", removeProductByCart)
cartsRouter.delete("/:cart_id/clear", clearCart);


export default cartsRouter;
