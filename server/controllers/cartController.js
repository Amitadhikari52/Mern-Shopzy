import { Cart } from "../models/cartModel.js";

// add To Cart
export const addToCart = async (req, res) => {
  const { productId, title, price, quantity, imgSrc } = req.body;
  try {
    const userId = req.user;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price += price * quantity;
    } else {
      cart.items.push({ productId, title, price, quantity, imgSrc });
    }

    await cart.save();
    res.status(201).send({
      success: true,
      message: "Product Added to cart Successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while adding product in cart",
    });
  }
};

// get User Cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "cart not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Product getting from cart successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in getting cart",
      error,
    });
  }
};

// remove product from cart
export const removeItemFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send({
        success: false,
        message: "cart not found",
      });
    }
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.status(201).send({
      success: true,
      message: "Product remove from cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in removing product from cart",
      error,
    });
  }
};

// clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ items: [] });
    } else {
      cart.items = [];
    }
    await cart.save();
    res.status(201).send({
      success: true,
      message: " cart cleared",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in clear cart",
    });
  }
};

// decrease qty from Cart
export const decreaseProductQty = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const userId = req.user;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      const item = cart.items[itemIndex];

      if (item.quantity > quantity) {
        const pricePerUnit = item.price / item.quantity;

        item.quantity -= quantity;
        item.price -= pricePerUnit * quantity;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.json({ messge: "invalid product Id" });
    }

    await cart.save();
    res.status(201).send({
      success: true,
      message: "Products quantity decresed ",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in decreasing product quantity",
      error,
    });
  }
};
