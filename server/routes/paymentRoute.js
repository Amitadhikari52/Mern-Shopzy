import express from "express";
import {
  allOrders,
  checkout,
  userOrder,
  verify,
} from "../controllers/paymentController.js";
import { Authenticated } from "../middlewares/auth.js";

const router = express.Router();

// checkout
router.post("/checkout", checkout);

// verify-payment & save to db
router.post("/verify-payment", verify);

// user order
router.get("/userorder", Authenticated, userOrder);

// All order's
router.get("/orders", allOrders);

export default router;
