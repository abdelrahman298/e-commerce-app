import React, { useContext, useEffect, useState } from "react";
import "./WishList.css";
import { wishContext } from "../../Contexts/WishContext/WishContextProvider.js";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { cartContext } from "../../Contexts/CartContext/CartContextProvider.js";

export default function WishList() {
  const { addProductToCart } = useContext(cartContext);
  const { allWishProducts, removeWishProduct } = useContext(wishContext);

  if (!allWishProducts) {
    <div className="d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 start-0 end-0 bg-info">
      <InfinitySpin
        visible={true}
        width="200"
        color="#fff"
        ariaLabel="infinity-spin-loading"
      />
    </div>;
  }

  async function addToCart(id) {
    const res = await addProductToCart(id);
    if (res) {
      toast.success("added to cart", { duration: 1700 });
    }
  }

  function deleteProduct(id) {
    const res = removeWishProduct(id);

    if (res) {
      toast.success("remove operation Done Successfully");
    }
  }

  return (
    <>
      <div className="wish-section">
        <div className="container ">
          <div className="wish-container p-5 my-5 ">
            {allWishProducts?.length ? (
              <>
                <div>
                  {" "}
                  {allWishProducts?.map((product, idx) => {
                    return (
                      <>
                        <div
                          key={idx}
                          className="row  align-items-center border-bottom pt-3"
                        >
                          <div className="col-2">
                            <figure>
                              <img
                                className="w-100"
                                src={product.imageCover}
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-8">
                            <p className="product-title fw-bold fs-5">
                              {product.title}
                            </p>
                            <p className="product-price fw-bold fs-6">
                              {product.price} EGP
                            </p>

                            <button
                              onClick={() => {
                                deleteProduct(product.id);
                              }}
                              style={{ background: "none" }}
                              className="btn-remove text-danger border-0 "
                            >
                              <i className="fas fa-trash me-2"></i>Remove
                            </button>
                            {/* <h6>{product.id}</h6> */}
                          </div>
                          <div className="col-2">
                            <div className="counter-container d-flex align-items-center">
                              <button
                                onClick={() => {
                                  addToCart(product.id);
                                }}
                                // style={{ height: "40px", width: "40px" }}
                                className="me-3 btn btn-lg btn-outline-success "
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h1>Empty wish</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
