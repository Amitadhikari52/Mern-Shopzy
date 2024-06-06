import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`.bgCyan.white);
});
