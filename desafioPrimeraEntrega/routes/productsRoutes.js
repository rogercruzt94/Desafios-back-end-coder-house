const { Router } = require("express");

const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
  } = require("../controllers/productsController");
let administrador=true;

const productosRouter = Router();

productosRouter.get(`/getAll`, getAllProducts);
productosRouter.get(`/:id`, getProductById);
productosRouter.post(`/addProduct`, addProduct);
productosRouter.put(`/:id`, updateProductById);
productosRouter.delete(`/:id`, deleteProductById);

module.exports = productosRouter;