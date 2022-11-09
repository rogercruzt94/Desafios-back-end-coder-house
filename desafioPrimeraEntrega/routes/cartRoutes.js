const { Router } = require("express");

const {
  getCart,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
  } = require("../controllers/cartController");
let administrador=true;
const carritoRouter = Router();

carritoRouter.get(`/:id`, getCart);
carritoRouter.post(`/add`, createCart);
carritoRouter.post(`/:idCar/:idProd`,addProduct);
carritoRouter.delete(`/:id`, deleteCartById);
carritoRouter.delete(`/:id/productos/:id_prod`, deleteProductById);

module.exports = carritoRouter;