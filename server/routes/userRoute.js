import express from "express";
import {
  loginUser,
  registerUser,
  users,
} from "../controllers/userController.js";

const router = express.Router();

//register user
router.post("/register", registerUser);

//login user
router.post("/login", loginUser);

//get all users
router.get("/all-users", users);

export default router;
