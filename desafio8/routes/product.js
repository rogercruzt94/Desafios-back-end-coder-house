import { Router } from "express";
import { productController } from "../controller/productController.js";

const productosApiRouter = Router();
productosApiRouter.get("/", productController.getData);

export default productosApiRouter;
