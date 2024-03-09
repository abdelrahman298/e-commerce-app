import React, { useContext } from "react";
import "./Payment.css";
import axios from "axios";
import { cartContext } from "../../Contexts/CartContext/CartContextProvider.js";

export default function Payment() {
  const { cartId } = useContext(cartContext);

  async function confirmPayment() {
    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;

    const shippingObj = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        shippingObj,
        {
          headers: { token: localStorage.getItem("tkn") },
          params: { url: "http://localhost:3000" },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          window.open(res.data.session.url, "_self");
        }
        console.log("from payment confirm", res);
        console.log("from payment confirm", res.data);
      })
      .catch((err) => {
        console.log("from payment Error", err);
        // console.log("from payment Error", err.data);
        console.log(details, phone, city, cartId, shippingObj);
      });
  }

  // async function confirmPayment() {
  //   const details = document.getElementById("details").value;
  //   const phone = document.getElementById("phone").value;
  //   const city = document.getElementById("city").value;
  //   const shippingAddress = {
  //     shippingAddress: {
  //       details,
  //       phone,
  //       city,
  //     },
  //   };
  //   await axios
  //     .post(
  //       ` https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
  //       shippingAddress,
  //       {
  //         headers: { token: localStorage.getItem("tkn") },
  //         params: { url: "http://localhost:3000" },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("Payment", res);
  //       console.log("Payment", res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("Payment", err);
  //       console.log(details, phone, city, cartId, shippingAddress);
  //     });
  // }

  return (
    <>
      <div className="payment-section">
        <div className="payment-container d-flex justify-content-center py-5">
          <div className="w-75">
            <form>
              <div className="mb-3">
                <label htmlFor="details" className="form-label">
                  Details
                </label>
                <input type="text" className="form-control" id="details" />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input type="phone" className="form-control" id="phone" />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input type="text" className="form-control" id="city" />
              </div>
              <button
                onClick={() => {
                  confirmPayment();
                }}
                type="button"
                class="btn btn-outline-info  w-100"
                // value="Pay Now"
              >
                Pay Now{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
