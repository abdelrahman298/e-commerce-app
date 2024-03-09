import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext/AuthContext.js";
import "./NavBar.css";
import { cartContext } from "../../Contexts/CartContext/CartContextProvider.js";

export default function NavBar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);

  const navigate = useNavigate();

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("tkn");
    console.log("logout done");
    navigate("/login");
  };

  console.log("token from navbar", token);
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-light bg-body-secondary">
        <div class="container ">
          {" "}
          <div className="row w-100">
            <div className="col-md-3">
              {" "}
              <Link
                className="navbar-brand d-flex justify-content-start"
                to="/home"
              >
                <i className="fas fa-cart-shopping fs-2 text-main"></i>
                <span className="fw-bold h4 fw-bolder">fresh cart</span>
              </Link>
            </div>
            <div className="col-md-5">
              {" "}
              <ul class="nav nav-main-item justify-content-end">
                {token ? (
                  <>
                    <li className="nav-item">
                      <Link
                        class="nav-link active"
                        aria-current="page"
                        to="/home"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link class="nav-link" to="/cart">
                        Cart
                      </Link>
                    </li>{" "}
                    <li className="nav-item">
                      <Link class="nav-link" to="/wishList">
                        Wish list
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link class="nav-link" to="/allProducts">
                        Products
                      </Link>
                    </li>{" "}
                    <li className="nav-item">
                      <Link class="nav-link" to="/categories">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link class="nav-link" to="/brands">
                        Brands
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <div className="col-md-4">
              {" "}
              <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                  {token ? (
                    <div className="d-flex">
                      <li className="nav-item">
                        <Link
                          className="nav-link  position-relative fs-5"
                          to="/cart"
                          target="_blank"
                        >
                          <i className="fas fa-cart-shopping"></i>
                          <span className="position-absolute top-1 start-95 translate-middle badge rounded-pill bg-danger">
                            {numOfCartItems ? numOfCartItems : ""}
                          </span>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <span role="button" onClick={logOut} class="nav-link">
                          logOut
                        </span>
                      </li>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <li className="nav-item">
                        <Link
                          class="nav-link"
                          to="/register"
                          aria-current="page"
                        >
                          Register
                          <span class="visually-hidden">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link class="nav-link" to="/login">
                          Login
                        </Link>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
