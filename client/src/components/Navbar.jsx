import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>SHOPZY CART</h3>
          </Link>
          <form onSubmit={submitHandler} className="search_bar">
            <span className="material-symbols-outlined">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
          <div className="right">
            <button className="btn btn-warning mx-3">Cart</button>
            <button className="btn btn-warning mx-3">Profile</button>
            <button className="btn btn-warning mx-3">Login</button>
            <Link to={"/register"} className="btn btn-info mx-3">
              Register
            </Link>
            <button className="btn btn-warning mx-3">Logout</button>
            {/* <button className="btn btn-warning">Logout</button> */}
          </div>
        </div>
        <div className="sub_bar"></div>
      </div>
    </>
  );
};

export default Navbar;
