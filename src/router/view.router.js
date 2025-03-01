import { Router } from "express";
import productsManager from "./../data/fs/products.fs.js";

const viewRouter = Router();

viewRouter.get("/", async (req, res, next) => {
  try {
    const all = await productsManager.readAll();
    const data = {
      title: "Home",
      products: all,
    };
    return res.render("index", data);
  } catch (error) {
    next();
  }
});

viewRouter.get("/product/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if(!one) return next()
    const data = {
      title: "Product",
      product: one,
    };
    res.status(200).render("product", data);
  } catch (error) {
    next();
  }
});

viewRouter.get("/carts", (req, res, next) => {
  try {
    const data = {
      title: "Carts",
    };
    res.status(200).render("carts", data);
  } catch (error) {
    next();
  }
});

viewRouter.get("/register", (req, res, next) => {
  try {
    const data = {
      title: "Register",
    };
    res.status(200).render("Register", data);
  } catch (error) {
    next();
  }
});

viewRouter.get("/profile", (req, res, next) => {
  try {
    const data = {
      title: "Profile",
    };
    res.status(200).render("profile", data);
  } catch (error) {
    next();
  }
});

viewRouter.get("/newProducts", (req, res, next) => {
  try {
    const data = {
      title: "New Products",
    };
    res.status(200).render("createProducts", data);
  } catch (error) {
    next();
  }
});

export default viewRouter;
