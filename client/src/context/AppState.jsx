import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const URL = "http://localhost:3009";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = await axios.get(`${URL}/api/product/get-product`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(api.data.products);
        setProducts(api.data.products);
        setFilteredData(api.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

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
  };

  // login user
  const login = async (email, password) => {
    try {
      const api = await axios.post(
        `${URL}/api/user/login`,
        {
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
      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token);
      return api.data;
    } catch (error) {
      console.error("Error during login:", error);
      return {
        success: false,
        message: "An error occurred during login. Please try again.",
      };
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        URL,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
