import React from "react";
import "./Brands.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
export default function Brands() {
  async function getAllBrands() {
    const brandsData = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    return brandsData;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
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

  const brandsData = data.data.data;
  console.log("brands Data", data.data.data);

  return (
    <>
      <div className="brand-section">
        <div className="brand-container py-3">
          <div className="container">
            <div className="title text-center mb-5 mt-3 text-success">
              <h2 className="fw-bolder fs-1">All Brands</h2>
            </div>

            <div className="row g-3">
              {brandsData?.map((brand, idx) => (
                <div key={idx} className="col-md-3">
                  <div className="brand-item text-center">
                    <div className="brand-img-container h-50">
                      <figure className="brand-img">
                        <img className="" src={brand.image} alt="shwal" />
                      </figure>
                    </div>
                    <div className="brand-Title-container text-center">
                      <h3>{brand.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
