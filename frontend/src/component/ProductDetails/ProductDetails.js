import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import "./ProdcutDetails.css";
import { getProductDetails } from "../../action/productAction";
import ReactStars from "react-rating-stars-component";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;

  //get product from state

  const productDetails = useSelector((state) => {
    // console.log(state,match.params.id,"productDetails");
    return (
      state.productDetails &&
      state.productDetails.product &&
      state.productDetails.product.product
    );
  });
  // console.log(productDetails, "productDetails");
  // action dispatch
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: productDetails && productDetails.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 30,
  };

  return (
    <Fragment>
      <div className="product_details">
        <div>
          <Carousel>
            {productDetails &&
              productDetails.images.map((ele, i) => {
                return (
                  <img
                    style={{ width: "300px" }}
                    key={i}
                    className="carouselImage"
                    src={ele.sample_id}
                    alt={`${i}slide`}
                  />
                );
              })}
          </Carousel>
        </div>
        {/* <div>Product # {productDetails && productDetails._id}</div> */}
        <div>
          <div className="detailsBlock_1">
            <h2>{productDetails && productDetails.description}</h2>
          </div>
          <div className="detailsBlock_2">
            <ReactStars {...options} />
            <span>
              ({productDetails && productDetails.numOfReviews}Reviews)
            </span>
          </div>
          <div className="detailsBlock_3">
            <h1>₹{productDetails && productDetails.price}</h1>
            <div className="detailsBlock_3_1">
              <div className="detailsBlock_3_1_1">
                <button>-</button>
                <input />
                <button>+</button>
                <button>Add to Cart</button>
              </div>
              <p>
                Status:
                <b style={{ color: "green" }}>
                  {productDetails && productDetails.Stock < 1
                    ? "outOfStock"
                    : "InStock"}
                </b>
              </p>
            </div>
          </div>
          <div className="detailsBlock_4">
            {productDetails && productDetails.category}
          </div>
          <button>Submit Review</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
