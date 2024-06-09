import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const URL = "http://localhost:3009";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${URL}/api/product/get-product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
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
            src={product.imgSrc}
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
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>
            {product.price} {"₹"}
          </h3>
          <div className="my-5">
            <button
              className="btn btn-danger mx-3"
              // style={{ fontWeight: "bold" }}
            >
              Buy Now
            </button>
            <button
              className="btn btn-warning"
              // style={{ fontWeight: "bold" }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      {product.category && <RelatedProduct category={product.category} />}
    </>
  );
};

export default ProductDetail;
