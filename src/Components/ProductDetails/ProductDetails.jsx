import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
import { cartContext } from "./../../Contexts/CartContext/CartContextProvider";
// ! /////////////////////////////////////
export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);

  async function getSpecificProduct() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: `getSpecificProduct-${id}`,
    queryFn: getSpecificProduct,
  });

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

  const productDetails = data.data.data;

  console.log(productDetails);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="product-section">
        <div className="product-container py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="img-container">
                  <Slider {...settings}>
                    <div>
                      <img
                        className="w-100"
                        src={productDetails.images[0]}
                        alt="prod"
                      />
                    </div>
                    <div>
                      <img
                        className="w-100"
                        src={productDetails.images[1]}
                        alt="prod"
                      />
                    </div>
                    <div>
                      <img
                        className="w-100"
                        src={productDetails.images[2]}
                        alt="prod"
                      />
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="col-md-8">
                <div className="product-content  h-100  d-flex flex-column justify-content-center">
                  <div className="prod-Deta-container">
                    <p className="prod-categ">{productDetails.category.name}</p>
                    <p className="prod-name">{productDetails.title}</p>
                    <div className="rated-price fw-bold d-flex justify-content-between">
                      <p>{productDetails.price} EGP</p>
                      <p>
                        <span>
                          <i className="fas fa-star star-rate "></i>
                        </span>
                        {productDetails.ratingsAverage}
                      </p>
                    </div>

                    <div className="add-favorite d-flex justify-content-between mb-2">
                      <button
                        onClick={() => {
                          addProductToCart(id);
                        }}
                        type="button"
                        class="btn bg-main w-75 text-white"
                      >
                        + Add
                      </button>

                      <Link className="">
                        <i className="fas fa-heart fs-2 "></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
