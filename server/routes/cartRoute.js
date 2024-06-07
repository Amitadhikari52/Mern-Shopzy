import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProductQty,
  getUserCart,
  removeItemFromCart,
} from "../controllers/cartController.js";

import { Authenticated } from "../middlewares/auth.js";

const router = express.Router();

// add to cart
router.post("/add-cart", Authenticated, addToCart);

// get User Cart
router.get("/get-cart", Authenticated, getUserCart);

// remove product from cart
router.delete("/remove-cart/:productId", Authenticated, removeItemFromCart);

// clear cart
router.delete("/clear-cart", Authenticated, clearCart);

// decrease items quantity
router.post("/decrease-qty", Authenticated, decreaseProductQty);

export default router;
