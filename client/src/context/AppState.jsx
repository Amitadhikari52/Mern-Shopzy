import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const URL = "http://localhost:3009";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = await axios.get(`${URL}/api/product/get-product`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProducts(api.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${URL}/api/user/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return api.data;
    // console.log("user register", api);
  };

  return (
    <AppContext.Provider value={{ products, register }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
