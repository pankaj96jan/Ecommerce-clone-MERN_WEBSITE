import React from "react";
import appstore from "./images-logo/appstore.png"
import "./Footer.css"

const Footer = () => {
    return (
        <div id="footer">
            <div id="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download app for Android or IOS Mobile Phone</p>
                <img src={appstore} alt="appstore" />

            </div>
            <div id="midFooter">
                <h4>DevilWEB</h4 >
                <p>High qulaity is  our first priority</p>
                <p>Copyrights 2021 &copy; MIT </p>
            </div>
            <div id="rightFooter">
                <h4>Follow us</h4>
                <a href="https:www.google.com">instagram</a>
                <a href="https:www.google.com">youtube</a>
                <a href="https:www.google.com">twitter</a>

            </div>
        </div>
    );
};

export default Footer;
