import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

//add product
router.post("/add-product", addProduct);

//get products
router.get("/get-product", getProducts);

//single product
router.get("/get-product/:id", getSingleProduct);

// Update Product
router.put("/update-product/:id", updateProduct);

// delete Product
router.delete("/delete-product/:id", deleteProduct);

export default router;
