import express from "express";
import { addAddress, getAddress } from "../controllers/addressController.js";
import { Authenticated } from "../middlewares/auth.js";

const router = express.Router();

//add address
router.post("/add-address", Authenticated, addAddress);

// get address
router.get("/get-address", Authenticated, getAddress);

export default router;
