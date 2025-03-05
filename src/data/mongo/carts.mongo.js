import Manager from "./manager.mongo.js";
import Cart from "./models/carts.model.js";

class CartsManager extends Manager {
  constructor() {
    super(Cart);
  }

  addProductToCart = async (user_id, product_id, quantity) => {
    try {
      const one = await this.create({ user_id, product_id, quantity });
      return one;
    } catch (error) {
      throw error;
    }
  };

  readProductByUser = async (user_id) => {
    try {
      const all = await this.read({ user_id });
      return all;
    } catch (error) {
      throw error;
    }
  };

  updateQuantity = async (cart_id, quantity) => {
    try {
      const one = await this.updateById(cart_id, { quantity });
      return one;
    } catch (error) {
      throw error;
    }
  };

  removeProductByCart = async (cart_id) => {
    try {
      const one = await this.destroyById(cart_id);
      return one;
    } catch (error) {
      throw error;
    }
  };

  deleteCart = async (user_id, cart_id) => {
    try {
      const cart = await this.read({ user_id }); // Buscar el carrito por usuario
      if (!cart) return null; // Si no existe, retorna null

      await this.model.deleteOne({ cart_id }); // Borra el carrito en MongoDB
      return { message: "Carrito eliminado correctamente" };
    } catch (error) {
      throw error;
    }
  };
}

const cartsManager = new CartsManager();
export default cartsManager;
