import { Address } from "../models/addressModel.js";

export const addAddress = async (req, res) => {
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;
  try {
    let userId = req.user;
    let userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });
    res.status(201).send({
      success: true,
      message: "Address added",
      userAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errow while adding Address",
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    let address = await Address.find({ userId: req.user }).sort({
      createdAt: -1,
    });
    res.status(201).send({
      success: true,
      message: "Address getting succesfully",
      userAddress: address[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while getting address",
      error,
    });
  }
};
