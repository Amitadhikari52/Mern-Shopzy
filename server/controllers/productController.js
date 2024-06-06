import { Product } from "../models/productModel.js";

//add product
export const addProduct = async (req, res) => {
  const { title, description, price, category, quantity, imgSrc } = req.body;
  try {
    let product = await Product.create({
      title,
      description,
      price,
      category,
      quantity,
      imgSrc,
    });
    res.status(201).send({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while adding product",
      error,
    });
  }
};

//get products
export const getProducts = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log();
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error,
    });
  }
};

//single product
export const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.status(401).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log();
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

//update product
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(401).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log();
    res.status(500).send({
      success: false,
      message: "Error in Update product",
      error,
    });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(401).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
