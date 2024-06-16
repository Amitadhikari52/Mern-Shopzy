import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import TableProduct from "./TableProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, URL, user, clearCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let quantity = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        quantity += cart.items[i].quantity;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQuantity(quantity);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${URL}/api/payment/checkout`, {
        amount: price,
        quantity: quantity,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });
      const { orderId, amount: orderAmount } = orderResponse.data;

      var options = {
        key: "rzp_test_Q941vaQMmTUT6u",
        amount: orderAmount * 100,
        currency: "INR",
        name: "Shopzy",
        description: "Happy Shopping!",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${URL}/api/payment/verify-payment`,
            paymentData
          );

          console.log("razorpay res ", api.data);

          if (api.data.success) {
            clearCart();
            navigate("/orderconfirmation");
          }
        },
        prefill: {
          name: "Shopzy",
          email: "shopzy52@gmail.com",
          contact: "900090000",
        },
        notes: {
          address: "New Delhi",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container my-3 mx-5">
        <h2 className="text-center">Order Summary</h2>

        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name: {userAddress?.fullName}</li>
                  <li>Phone: {userAddress?.phoneNumber}</li>
                  <li>Country: {userAddress?.country}</li>
                  <li>State: {userAddress?.state}</li>
                  <li>City: {userAddress?.city}</li>
                  <li>Pin Code: {userAddress?.pincode}</li>
                  <li>Near By: {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <button className="Btn" onClick={handlePayment}>
          Proceed to Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
