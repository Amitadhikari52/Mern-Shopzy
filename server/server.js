import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//PORT
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(cors());

//rest api
app.get("/", (req, res) => {
  res.send("Welcome to the Shopzy");
});

//routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`.bgCyan.white);
});
