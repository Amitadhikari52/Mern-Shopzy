import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check user
    let exisitingUser = await User.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashPassword = await bcrypt.hash(password, 10);
    let user = await User.create({ name, email, password: hashPassword });
    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find the user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //match
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    res.status(200).send({
      success: true,
      // message: "User Login Successfully",
      message: `Welcome ${user.name}`,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// get All users
export const users = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "User getting Successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting users",
      error,
    });
  }
};
