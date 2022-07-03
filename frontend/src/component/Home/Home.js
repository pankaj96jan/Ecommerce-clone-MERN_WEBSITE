import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import Product from "./Product";
import { getProduct } from "../../action/productAction";
import { useDispatch, useSelector } from "react-redux"


const Home = () => {
    const products = useSelector((state) => {
        // console.log(state,"Home");
        return state.products.products
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    // console.log("home",products);

    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to the Store</p>
                <h1>Find Amazing Products Below</h1>

                <a href="#container">
                    <button>Scroll <CgMouse /> </button>
                </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
                {products && products.map((ele, i) => {
                    return <Product key={i} product={ele} />
                })}
            </div>


        </Fragment>
    );
};

export default Home;
