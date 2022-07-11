import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../action/productAction";
import Product from "../Home/Product";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";

const Products = ({ match }) => {
  const [price, setPrice] = useState([0, 25000])
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const setCurentPageNo = (e) => {
    setCurrentPage(e);
  };

  const keyword = match.params.keyword;

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice)
  }

  const { products, loading, productCount, resultPerPage, filteredProductCount } = useSelector(
    (state) => {
      return state.products;
    }
  );
  // console.log(products, loading, productCount);
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  let count = filteredProductCount;
  // console.log(count, resultPerPage);

  const categories = [
    "Laptop",
    "Footwear",
    "electronic",
    "fasion",
    "homeaccesories",
    "rightBrothers",
    "pulse",
    "picasso",
    "specs"
  ]


  return (
    <Fragment>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Fragment>
          <h2 className="products_heading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((ele) => {
                return <li
                  className="category-link"
                  key={ele}
                  onClick={() => setCategory(ele)}
                >{ele}</li>
              })}
            </ul>
            <fieldset>
              <Typography component="legend" >Ratings above</Typography>
              <Slider value={ratings}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
                onChange={(e, newRating) => {
                  setRatings(newRating)
                }}
              />
            </fieldset>
          </div>
          <div className="paginationBox">
            {resultPerPage < count && (<Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page_item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
            )}
          </div>
        </Fragment>
      )
      }
    </Fragment >
  );
};

export default Products;
