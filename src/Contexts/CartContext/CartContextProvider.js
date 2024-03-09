import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "../AuthContext/AuthContext.js";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allCartProducts, setAllCartProducts] = useState(null);
  const [cartId, setcartId] = useState(null);
  const { token } = useContext(authContext);

  function addProductToCart(id) {
    const res = axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        console.log("res", res);
        getUserCart();
        return true;
      })
      .catch((err) => {
        console.log("err", err);
        return false;
      });
    return res;
  }

  async function getUserCart() {
    const res = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        if (res.data.status === "success") {
          setcartId(res.data.data._id);
          setNumOfCartItems(res.data.numOfCartItems);
          setTotalCartPrice(res.data.data.totalCartPrice);
          setAllCartProducts(res.data.data.products);

          console.log("cartId from get cart ctx()", cartId);
        }
      })
      .catch((err) => {
        console.log("err from get cart context ctx()", err);
      });
  }
  function updateProductCount(id, newCount) {
    const result = axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        //we have update the data to we have to set the new Data
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setAllCartProducts(res.data.data.products);

        console.log("res from update", res);
        return true;
      })
      .catch((err) => {
        console.log("err from update", err);
        return false;
      });
    return result;
  }

  function removeCartProduct(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setAllCartProducts(res.data.data.products);

        console.log("res of delete item", res);
      })
      .catch((err) => {
        console.log("res of delete item", err);
      });
  }

  function clearCart() {
    const res = axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setAllCartProducts(null);

        console.log("res of clear cart", res);
        return true;
      })
      .catch((err) => {
        console.log("res of clear cart", err);
        return false;
      });
    return res;
  }
  // ? a7na mesh bne3mil call hena 3shan d mesh component
  useEffect(() => {
    getUserCart();
  }, [token]);

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        totalCartPrice,
        allCartProducts,
        addProductToCart,
        updateProductCount,
        removeCartProduct,
        clearCart,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
