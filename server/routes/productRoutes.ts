import express from "express";
import {
  createProduct,
  deleteProduct,
  getFlashDeals,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/flash-deals", getFlashDeals);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", auth, createProduct);
productRouter.put("/:id", auth, updateProduct);
productRouter.delete("/:id", auth, deleteProduct);

export default productRouter;
