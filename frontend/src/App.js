import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";

import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./component/Home/Home";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import Search from "./component/Home/Search";
import Products from "./component/Home/Products";
import LoginSignUp from "./component/User/LoginSignUp";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        {/* product routes  */}
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        {/* user login sign up routes */}
        <Route exact path="/login" component={LoginSignUp} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
