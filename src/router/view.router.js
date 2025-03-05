import { Router } from "express";
// import productsManager from "./../data/fs/products.fs.js";
import productsManager from "../data/mongo/products.mongo.js";
import cartsManager from "../data/mongo/carts.mongo.js";

const viewRouter = Router();

viewRouter.get("/", async (req, res, next) => {
  try {
    const all = await productsManager.read()
    const data = {
      title: "Home",
      products: all,
    };
    return res.render("index", data);
  } catch (error) {
    next(error);
  }
});


viewRouter.get("/product/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    console.log("🟢 ID recibido en la URL:", pid);
    const one = await productsManager.readById(pid);
    console.log("🟢 Producto obtenido:", one);
    if (!one) {
      return res
        .status(404)
        .send("❌ Producto no encontrado en la base de datos.");
    }
    const data = {
      title: "Product",
      product: one,
    };
    res.status(200).render("product", data);
  } catch (error) {
    next(error);
  }
});


viewRouter.get("/carts/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await cartsManager.readProductByUser(uid)
    console.log("Carrito encontrado:", one); 
    if (!one) {
      return res
        .status(404)
        .render("carts", { error: "Carrito no encontrado" });
    }
    const data = {
      title: "Carts",
      cart: one,
    };
    res.status(200).render("carts", data);
  } catch (error) {
    next(error);
  }
});


viewRouter.get("/register", (req, res, next) => {
  try {
    const data = {
      title: "Register",
    };
    res.status(200).render("register", data);
  } catch (error) {
    next(error);
  }
});


viewRouter.get("/profile", (req, res, next) => {
  try {
    const data = {
      title: "Profile",
    };
    res.status(200).render("profile", data);
  } catch (error) {
    next(error);
  }
});


viewRouter.get("/newProducts", (req, res, next) => {
  try {
    const data = {
      title: "New Products",
    };
    res.status(200).render("createProducts", data);
  } catch (error) {
    next(error);
  }
});


export default viewRouter;
