import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AppState = (props) => {
  const URL = "http://localhost:3009";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);

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
    userCart();
  }, [token, reload]);

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
          "Content-Type": "Application/json",
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
            "Content-Type": "Application/json",
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
          "Content-Type": "Application/json",
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

  // Add to cart
  const addToCart = async (productId, title, price, quantity, imgSrc) => {
    try {
      const api = await axios.post(
        `${URL}/api/cart/add-cart`,
        { productId, title, price, quantity, imgSrc },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message);
      console.log("my cart", api);
    } catch (error) {
      toast.error(api.data.message);
      console.error("Error fetching products:", error);
    }
  };

  //user cart
  const userCart = async () => {
    const api = await axios.get(`${URL}/api/cart/get-cart`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: token,
      },
      withCredentials: true,
    });
    setCart(api.data.cart);
  };

  // qty --
  const decreaseQty = async (productId, quantity) => {
    const api = await axios.post(
      `${URL}/api/cart/decrease-qty`,
      { productId, quantity },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(api.data.message);
  };

  // remove item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${URL}/api/cart/remove-cart/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    toast.success(api.data.message);
  };

  // clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${URL}/api/cart/clear-cart`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    toast.success(api.data.message);
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
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
