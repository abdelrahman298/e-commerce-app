import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="CategorySlider-section my-5">
        <div className="CategorySlider-container">
          <div className="container justify-content-center align-items-center text-center">
            <div className="row">
              <div className="col-md-12">
                <div className="Slider-container w-100">
                  <Slider {...settings}>
                    {data?.data.data.map((categ) => (
                      <>
                        <div className="">
                          <img
                            style={{ width: "250px", height: "250px" }}
                            // className="w-50"
                            src={categ.image}
                            alt="product"
                          />
                        </div>
                      </>
                    ))}
                  </Slider>
                </div>
              </div>
              {/* <div className="col-md-3"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
