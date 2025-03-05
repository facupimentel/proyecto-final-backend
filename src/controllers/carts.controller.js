import cartsManager from "../data/mongo/carts.mongo.js";

const addProductToCart = async (req, res, next) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const one = await cartsManager.addProductToCart(
      user_id,
      product_id,
      quantity
    );
    if (one) {
      res.status(201).json({
        method: req.method,
        url: req.url,
        response: one,
      });
    }
  } catch (error) {
    next(error);
  }
};

const readProductByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const all = await cartsManager.readProductByUser(user_id).lean();
    if (all.length > 0) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: all,
      });
    }
    const error = new Error("not products in cart");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    const { quantity } = req.body;
    const one = await cartsManager.updateQuantity(cart_id, quantity);
    if (one) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: one,
      });
    }
    const error = new Error("not found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

const removeProductByCart = async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    const one = await cartsManager.removeProductByCart(cart_id);
    if (one) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: one,
      });
    }
    const error = new Error("not found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

// Cancelar la compra (borrar el carrito)
const clearCart = async (req, res, next) => {
  try {
    const { cart_id } = req.params; // 
    const deletedCart = await cartsManager.deleteCart(cart_id);

    if (!deletedCart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.status(200).json({ message: "Carrito vaciado con éxito" });
  } catch (error) {
    next(error);
  }
};

export {
  addProductToCart,
  readProductByUser,
  updateQuantity,
  removeProductByCart,
  clearCart,
};
