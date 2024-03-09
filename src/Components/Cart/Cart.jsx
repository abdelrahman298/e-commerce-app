import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { cartContext } from "../../Contexts/CartContext/CartContextProvider.js";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import { Toast } from "bootstrap";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    numOfCartItems,
    totalCartPrice,
    allCartProducts,
    updateProductCount,
    removeCartProduct,
    clearCart,
  } = useContext(cartContext);

  if (!allCartProducts) {
    <div className="d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 start-0 end-0 bg-info">
      <InfinitySpin
        visible={true}
        width="200"
        color="#fff"
        ariaLabel="infinity-spin-loading"
      />
    </div>;
  }

  async function updateCount(id, newCount) {
    const res = await updateProductCount(id, newCount);

    if (res) {
      toast.success("operation Done Successfully");
    }
  }

  async function deleteProduct(id) {
    const res = await removeCartProduct(id);

    if (res) {
      toast.success("remov operation Done Successfully");
    }
  }

  const nav = useNavigate();
  async function clearCartItems() {
    const res = await clearCart();

    if (res) {
      toast.success("Cart Cleared  Successfully", { duration: 1300 });
      setTimeout(() => {
        nav("/home");
      }, 1300);
    }
  }
  // const [newCount, setNewCount] = useState(0);

  return (
    <>
      <div className="cart-section">
        <div className="container ">
          <div className="cart-container p-5 my-5 ">
            <div className="row justify-content-between">
              <div className="col-3">
                <h2 className=" mb-4 fw-bold">cart shop</h2>
                <h5 className="fw-bold">
                  total Price :
                  <span className="text-success"> {totalCartPrice} </span> EGP
                </h5>
              </div>
              <div className="col-3 d-flex flex-column align-items-end">
                <Link
                  to={"/payment"}
                  disabled={allCartProducts < 1}
                  className="btn btn-primary btn-lg mb-3"
                >
                  check out
                </Link>
                <p className="fw-bold ">
                  total number of items:
                  <span className="text-success"> {numOfCartItems}</span>
                </p>
              </div>
            </div>
            {allCartProducts?.length ? (
              <>
                <div>
                  {" "}
                  {allCartProducts?.map((product, idx) => {
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
                                src={product.product.imageCover}
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-8">
                            <p className="product-title fw-bold fs-5">
                              {product.product.title}
                            </p>
                            <p className="product-price fw-bold fs-6">
                              {product.price} EGP
                            </p>

                            <button
                              onClick={() => {
                                deleteProduct(product.product.id);
                              }}
                              style={{ background: "none" }}
                              className="btn-remove text-danger border-0 "
                            >
                              <i className="fas fa-trash me-2"></i>Remove
                            </button>
                          </div>
                          <div className="col-2">
                            <div className="counter-container d-flex align-items-center">
                              <button
                                onClick={() => {
                                  updateCount(
                                    product.product.id,
                                    product.count + 1
                                  );
                                }}
                                style={{ height: "40px", width: "40px" }}
                                className="me-3 border-info "
                              >
                                <i className="fas fa-plus border="> </i>
                              </button>

                              <p className="m-0">{product.count}</p>

                              <button
                                disabled={product.count === 1}
                                onClick={() => {
                                  updateCount(
                                    product.product.id,
                                    product.count - 1
                                  );
                                }}
                                style={{ height: "40px", width: "40px" }}
                                className="ms-3 border-info"
                              >
                                <i className="fas fa-minus"> </i>
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
                <h1>Empty Cart</h1>
              </>
            )}

            <div className="row justify-content-center">
              <button
                disabled={allCartProducts < 1}
                onClick={() => {
                  clearCartItems();
                }}
                style={{ width: "fit-content" }}
                className="btn btn-outline-success btn-lg mt-3"
              >
                Clear Your Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
