import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import addressRoutes from "./routes/addressRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//PORT
const PORT = process.env.PORT || 3009;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//testing route
app.get("/", (req, res) => {
  res.send("Welcome to the Shopzy");
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`.bgCyan.white);
});
