import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllProducts.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import { cartContext } from "../../Contexts/CartContext/CartContextProvider.js";
import toast from "react-hot-toast";
import { wishContext } from "./../../Contexts/WishContext/WishContextProvider";

export default function AllProducts() {
  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { addProductToCart, numOfCartItems } = useContext(cartContext);
  const { addProductToWish, allWishProducts } = useContext(wishContext);
  /*   const [isChecked, setIsChecked] = useState(false);
  const [favoritesArr, setFavoritesArr] = useState([]);
 */
  //! From v5 you should add the useQuery in Object{queryKey: ,queryFn: }

  const { data, isLoading } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });

  // ! add to cart
  async function addProductCart(id) {
    const res = await addProductToCart(id);
    if (res) {
      toast.success("product added to Cart successfly", { duration: 1700 });
    }
  }

  // !add to wish
  async function addProductWish(id) {
    const res = await addProductToWish(id);
    // await checkFavorite(id);

    if (res) {
      toast.success("product added to Wish successfly", { duration: 1700 });
    }
  }

  /*  async function checkFavorite(id) {
    // ? 1- collect all of the ids of allGeneral Products
    const ArrayIds = data.data.data.map((prod) => {
      return prod.id;
    });
    const allProdsIds = [...ArrayIds];

    // ? 2- collect all of the ids of Wish products

    const wishIds = allWishProducts.map((prod) => {
      return prod.id;
    });
    const allWishIds = [...wishIds];

    // const allWishIds = [...ArrayIds];

    // ? 3- check the mutual between them
    const commonProd = allProdsIds.filter((value) =>
      allWishIds.includes(value)
    );

    // ? 4- change the color of their favorite
    setFavoritesArr(commonProd);
    // ? check the id in the WishProducts
    // const clickedProd = await allWishProducts.find((prod) => {
    //   return id === prod.id;
    // });

    // console.log("filter res", allWishProducts);
    console.log("filter wishIds", commonProd);
  } */

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 start-0 end-0 bg-info">
        <InfinitySpin
          visible={true}
          width="200"
          color="#fff"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  return (
    <>
      <div className="products-section">
        <div className="products-container  position-relative">
          <div className="container">
            <div className="search-container w-100 text-center">
              <input type="search" id="searchData" placeholder="Search" />
            </div>
            <div className="row gx-4 gy-5">
              {data?.data.data.map((product, indx) => (
                <>
                  <div key={indx} className="col-md-3">
                    <div role="button" className="product-item">
                      <div className="product product-container d-flex flex-column p-3">
                        <Link to={`/productDetails/${product.id}`}>
                          <img
                            src={product.imageCover}
                            className="w-100"
                            alt="product item"
                          />
                          <p className="category-name">
                            {product.category.name}
                          </p>
                          <p className="fw-bold">{product.title}</p>
                          <div className="rated-price fw-bold d-flex justify-content-between">
                            <p>{product.price} EGP</p>
                            <p>
                              <span>
                                <i className="fas fa-star star-rate "></i>
                              </span>
                              {product.ratingsAverage}
                            </p>
                          </div>
                        </Link>
                        <div className="add-favorite d-flex justify-content-evenly mb-2">
                          <button
                            onClick={() => {
                              addProductCart(product.id);
                            }}
                            type="button"
                            class="btn bg-main w-75 text-white"
                          >
                            + Add
                          </button>

                          {/* <button className="w-75 add-btn">+ Add</button> */}
                          <Link
                            onClick={() => {
                              addProductWish(product.id);
                            }}
                            className=""
                          >
                            <i
                              id="favorite"
                              // style={{ color: isChecked ? "black" : "red" }}
                              style={
                                {
                                  // color: isChecked[product.id] ? "red" : "black",
                                  /*  color: favoritesArr.includes(product.id)
                                  ? "red"
                                  : "black", */
                                }
                              }
                              className="favorite fas fa-heart fs-2 "
                            ></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
