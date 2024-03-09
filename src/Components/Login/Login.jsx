import React, { useContext, useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext/AuthContext.js";

export default function Login() {
  const { setToken } = useContext(authContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(undefined);
  const navigate = useNavigate();

  // false sumbit function
  async function mySubmit(values) {
    setIsLoading(true);
    const { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        console.log("res", res.data.token);
        localStorage.setItem("tkn", res.data.token);
        setToken(res.data.token);
        setisSuccess(true);
        setIsLoading(false);
        navigate("/home");
        setTimeout(() => {
          setisSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        setisError(err.response.data.message);
        setIsLoading(false);

        setTimeout(() => {
          setisError(undefined);
        }, 3000);
        console.log("err", err);
      });
  }

  const userData = {
    email: "",
    password: "",
  };

  const myFormik = useFormik({
    initialValues: userData,
    ////////////////! On Submit////////////
    onSubmit: mySubmit,
    //////////////! validation //////////
    validate: (values) => {
      const errors = {};

      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (emailRegex.test(values.email) === false) {
        errors.email = `your email must contain @ and .com `;
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = `Minimum six characters`;
      }

      return errors;
    },
  });

  return (
    <>
      <div className="login-section d-flex flex-column">
        <div className="login-container">
          <div className="container">
            {isSuccess ? (
              <div
                class="alert alert-success w-50 mx-auto text-center"
                role="alert"
              >
                Welcome back
              </div>
            ) : (
              ""
            )}
            {isError ? (
              <div
                class="alert alert-danger w-50 mx-auto text-center"
                role="alert"
              >
                {isError}
              </div>
            ) : (
              ""
            )}
            <form onSubmit={myFormik.handleSubmit}>
              {/* //////////////////////////////////////////////////////! */}
              <h2 className="login-now mb-4">login now</h2>

              {/* //////////////////////////////////////////////////////  */}
              <label for="email" className="form-label font-sm fw-bold">
                Email :
              </label>
              <input
                onChange={myFormik.handleChange}
                value={myFormik.values.email}
                onBlur={myFormik.handleBlur}
                type="email"
                id="email"
                className="form-control mb-2"
              />
              {myFormik.errors.email && myFormik.touched.email ? (
                <div class="alert alert-danger" role="alert">
                  {myFormik.errors.email}
                </div>
              ) : (
                ""
              )}
              {/* //////////////////////////////////////////////////////  */}
              <label for="password" className="form-label font-sm fw-bold">
                password :
              </label>
              <input
                onChange={myFormik.handleChange}
                value={myFormik.values.password}
                onBlur={myFormik.handleBlur}
                type="password"
                id="password"
                className="form-control mb-2"
              />
              {myFormik.errors.password && myFormik.touched.password ? (
                <div class="alert alert-danger" role="alert">
                  {myFormik.errors.password}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                className="btn bg-main ms-auto d-block text-white text-center "
              >
                {isLoading ? (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                  />
                ) : (
                  "login now "
                )}
              </button>
              {/* //////////////////////////////////////////////////////! */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
