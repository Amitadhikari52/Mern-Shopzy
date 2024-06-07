import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const Authenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.userId;

    let user = await User.findById(id);

    if (!user) return res.json({ message: "User not exist" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
