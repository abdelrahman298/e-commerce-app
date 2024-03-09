import React, { useContext, useState } from "react";
import "./Register.css";
import { useFormik } from "formik";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authContext } from "./../../Contexts/AuthContext/AuthContext";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(undefined);
  const navigate = useNavigate();

  // false sumbit function
  const { setToken } = useContext(authContext);
  async function mySubmit(values) {
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        console.log("res from register", res.data.token);
        localStorage.setItem("tkn", res.data.token);
        setToken(res.data.token);
        setisSuccess(true);
        setIsLoading(false);
        navigate("/login");
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
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const myFormik = useFormik({
    initialValues: userData,
    ////////////////! On Submit////////////
    onSubmit: mySubmit,
    //////////////! validation //////////
    validate: (values) => {
      const errors = {};

      const nameRegex = /^[a-zA-Z]{4,}/;
      if (nameRegex.test(values.name) === false) {
        errors.name = `Your name must be from 4 to above letters `;
      }

      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (emailRegex.test(values.email) === false) {
        errors.email = `your email must contain @ and .com `;
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = `Minimum six characters`;
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = `don't match with password`;
      }

      const phoneRegex = /^01[0-2]\d{1,8}$/;
      if (phoneRegex.test(values.phone) === false) {
        errors.phone = `your number should be Egyptian `;
      }

      return errors;
    },
  });

  return (
    <>
      <div className="register-section d-flex flex-column">
        <div className="register-container">
          <div className="container">
            {isSuccess ? (
              <div
                class="alert alert-success w-50 mx-auto text-center"
                role="alert"
              >
                Congratulation Your account has been submitted successfully
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
              <h2 className="register-now mb-4">register now</h2>
              {/* //////////////////////////////////////////////////////  */}
              <label for="userName" className="form-label font-sm fw-bold">
                Name :
              </label>
              <input
                onChange={myFormik.handleChange}
                value={myFormik.values.name}
                onBlur={myFormik.handleBlur}
                type="text"
                id="userName"
                name="name"
                className="form-control mb-2"
              />
              {myFormik.errors.name && myFormik.touched.name ? (
                <div class="alert alert-danger" role="alert">
                  {myFormik.errors.name}
                </div>
              ) : (
                ""
              )}
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
              {/* //////////////////////////////////////////////////////  */}
              <label for="rePassword" className="form-label font-sm fw-bold">
                Re-password :
              </label>
              <input
                onChange={myFormik.handleChange}
                value={myFormik.values.rePassword}
                onBlur={myFormik.handleBlur}
                type="password"
                id="rePassword"
                className="form-control mb-2"
              />
              {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
                <div class="alert alert-danger" role="alert">
                  {myFormik.errors.rePassword}
                </div>
              ) : (
                ""
              )}
              {/* //////////////////////////////////////////////////////  */}
              <label for="phone" className="form-label font-sm fw-bold">
                phone :
              </label>
              <input
                onChange={myFormik.handleChange}
                value={myFormik.values.phone}
                onBlur={myFormik.handleBlur}
                type="phone"
                id="phone"
                className="form-control mb-2"
              />
              {myFormik.errors.phone && myFormik.touched.phone ? (
                <div class="alert alert-danger" role="alert">
                  {myFormik.errors.phone}
                </div>
              ) : (
                ""
              )}
              {/* //////////////////////////////////////////////////////  */}
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
                  "Register now "
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
