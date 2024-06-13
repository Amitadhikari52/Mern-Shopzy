import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import TableProduct from "./TableProduct";

const Checkout = () => {
  const { cart, userAddress } = useContext(AppContext);

  return (
    <>
      <div className="conatiner my-3 mx-5">
        <h2 className="text-center ">Order Summary</h2>

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
                  <li>
                    Name : {""}
                    {userAddress?.fullName}
                  </li>
                  <li>
                    Phone : {""}
                    {userAddress?.phoneNumber}
                  </li>
                  <li>
                    Country : {""}
                    {userAddress?.country}
                  </li>
                  <li>
                    State : {""}
                    {userAddress?.state}
                  </li>
                  <li>
                    City : {""}
                    {userAddress?.city}
                  </li>
                  <li>
                    Pin Code : {""}
                    {userAddress?.pincode}
                  </li>
                  <li>
                    Near By : {""}
                    {userAddress?.address}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Checkout;
