import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const URL = "http://localhost:3009";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();

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
        userProfile();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  useEffect(() => {
    let lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
      setIsAuthenticated(true);
    }
    // setToken(localStorage.getItem('token'))
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

  // logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
  };

  //user profile
  const userProfile = async () => {
    try {
      const api = await axios.get(`${URL}/api/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });
      // console.log("user profile", api.data);
      setUser(api.data.user);
    } catch (error) {
      console.error("Error fetching products:", error);
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
        logout,
        user,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
