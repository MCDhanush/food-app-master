import { React, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
// import { response } from "express";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("https://bd-f.onrender.com/api/foodData", {
      method: "GET",
    });
    response = await response.json();
    setFoodCat(response[1]);
    setFoodItems(response[0]);
    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade ssk"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div
              className="carousel-caption"
              style={{ zIndex: "10", objectFit: "contain !important" }}
            >
              <form className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  search="value"
                  // onkeypress={return AvoidSpace(event)"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </form>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×400?tacos"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×400?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×400?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className="row mb-3">
                  <div key={data.id} className="fs-3 mt-3 mt-1">
                    {data.CategoryName}
                  </div>
                  <hr
                    id="hr-success"
                    style={{
                      height: "4px",
                      backgroundImage:
                        "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                    }}
                  />
                  {foodItems !== [] ? (
                    foodItems
                      .filter(
                        (items) =>
                          items.CategoryName === data.CategoryName &&
                          items.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems.id}
                            className="col-12 col-md-6 col-lg-3 card-pad"
                          >
                            {/* {console.log(filterItems.url)} */}
                            <Card
                              // parent of props *remainder
                              foodItems={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div> No Such Data </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
