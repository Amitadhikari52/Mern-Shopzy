import express from "express";
import {
  loginUser,
  profile,
  registerUser,
  users,
} from "../controllers/userController.js";

import { Authenticated } from "../middlewares/auth.js";

const router = express.Router();

//register user
router.post("/register", registerUser);

//login user
router.post("/login", loginUser);

//get all users
router.get("/all-users", users);

// get user profile
router.get("/profile", Authenticated, profile);

export default router;
