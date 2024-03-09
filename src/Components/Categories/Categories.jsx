import React from "react";
import "./Categories.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
export default function Categories() {
  async function getAllCategory() {
    const categoriesData = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return categoriesData;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
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

  const categoriesData = data.data.data;
  console.log("categorydata", data.data.data);

  return (
    <>
      <div className="category-section">
        <div className="category-container py-3">
          <div className="container">
            <div className="row g-3">
              {categoriesData?.map((categ, idx) => (
                <div key={idx} className="col-md-4">
                  <div className="category-item text-center">
                    <div className="cat-img-container h-50">
                      <figure className="cat-img">
                        <img className="" src={categ.image} alt="shwal" />
                      </figure>
                    </div>
                    <div className="cat-Title-container text-center">
                      <h3>{categ.name}</h3>
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
