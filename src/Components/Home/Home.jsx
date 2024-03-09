import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import AllProducts from "../allproducts/AllProducts.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "../HomeSlider/SimpleSlider.jsx";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";

export default function Home() {
  return (
    <>
      <div className="my-4">
        <SimpleSlider />
        <CategorySlider />
        <AllProducts />
      </div>
    </>
  );
}
