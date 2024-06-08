import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const URL = "http://localhost:3009";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${URL}/api/product/get-product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.product);
      setProduct(api.data.product);
      // setProducts(api.data.products);
    };
    fetchProduct();
  }, [id]);
  return (
    <div
      className="container text-center my-5"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div className="left">
        <img
          src={product?.imgSrc}
          alt=""
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            border: "2px solid cyan",
          }}
        />
      </div>
      <div className="right">
        <h1>{product?.title}</h1>
        <p>{product?.description}</p>
        <h3>
          {product?.price} {"₹"}
        </h3>
        <h3>{product.category}</h3>
        <div className="my-5">
          <button
            className="btn btn-danger mx-3"
            style={{ fontWeight: "bold" }}
          >
            Buy Now
          </button>
          <button className="btn btn-warning" style={{ fontWeight: "bold" }}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
