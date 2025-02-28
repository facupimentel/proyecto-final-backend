const isValidProduct = (req, res, next) => {
  try {
    // primero validamos estos datos
    const { title, price } = req.body;
    // si no existe title, va para el catch y lo maneja el middlewares de errores
    if (!title) {
      const error = new Error("type title");
      error.status = 400;
      throw error;
    }
    // si no existe price, va para el catch y lo maneja el middlewares de errores
    if (!price) {
      const error = new Error("type price");
      error.status = 400;
      throw error;
    }
    // si esta todo bien te dejo pasar
    next();
  } catch (error) {
    next(error);
  }
};

export default isValidProduct;
