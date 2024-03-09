import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="slider-section">
        <div className="slider-container">
          <div className="container justify-content-center align-items-center text-center">
            <div className="row">
              <div className="col-md-12">
                <div className="slider-container w-100">
                  <Slider {...settings}>
                    <div className="">
                      <img
                        style={{ width: "100%" }}
                        // className="w-50"
                        src={require("../../assets/images/2.png")}
                        alt="product"
                      />
                    </div>
                    <div className="">
                      <img
                        style={{ width: "100%" }}
                        // className="w-50"
                        src={require("../../assets/images/4.jpeg")}
                        alt="product"
                      />
                    </div>
                    <div className="">
                      <img
                        style={{ width: "100%" }}
                        // className="w-50"
                        src={require("../../assets/images/3.jpeg")}
                        alt="product"
                      />
                    </div>
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
