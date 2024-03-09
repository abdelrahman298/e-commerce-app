import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "../AuthContext/AuthContext.js";

export const wishContext = createContext();
export default function WishContextProvider({ children }) {
  const [allWishProducts, setAllWishProducts] = useState(null);
  const { token } = useContext(authContext);
  // const [favorites, setFavorites] = useState({});

  function addProductToWish(id) {
    const res = axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        // console.log("res from add prod to wish", res);
        getUserWish();
        // setFavorites((prev) => ({
        //   ...prev,
        //   [id]: !prev[id],
        // }));

        return true;
      })
      .catch((err) => {
        console.log("err from add prod to wish", err);
        return false;
      });
    return res;
  }
  async function getUserWish() {
    const res = await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        if (res.data.status === "success") {
          // setNumOfWishItems(res.data.numOfWishItems);
          // setTotalWishPrice(res.data.data.totalWishPrice);
          setAllWishProducts(res.data.data);
          console.log("res from get Wish Product ctx()", res.data.data);
          return true;
        }
      })
      .catch((err) => {
        console.log("err from get Wish context ctx()", err);
        return false;
      });
    return res;
  }

  async function removeWishProduct(id) {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        // setAllWishProducts(res.data.data);
        getUserWish();
        console.log("res of delete item", res);
        return true;
      })
      .catch((err) => {
        console.log("res of delete item", err);
        return false;
      });
    // return res;
  }

  // ? a7na mesh bne3mil call hena 3shan d mesh component
  useEffect(() => {
    getUserWish();
  }, [token]);

  return (
    <wishContext.Provider
      value={{
        allWishProducts,
        addProductToWish,
        removeWishProduct,
        // favorites,
        // setFavorites,
        // isChecked,
        // setIsChecked,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}
