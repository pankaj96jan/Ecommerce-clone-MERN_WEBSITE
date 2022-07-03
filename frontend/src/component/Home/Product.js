import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Product.css";


const Product = ({ product }) => {

  const { ratings,numOfReviews } = product
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 30,
  };
  return (
    <Link className="productLink" to={`/product/${product._id}`}>
      <div className="product_card" >
        <img id="product_cardImg"
          src={product.images[0].sample_id}
          alt={product.description}
        />
        <p id="product_cardPara">{product.name}</p>
        <div id="productcardStarReview">
          <ReactStars {...options} /> <span>{numOfReviews}</span>
        </div>
        <span>₹{product.price}</span>
      </div>
    </Link>
  );
};

export default Product;
