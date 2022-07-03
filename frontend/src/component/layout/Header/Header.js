import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import logo from "../Header/images/logo1.png"  
const Header = () => {
    return (
        <ReactNavbar
            navColor1="white"
            burgerColor="black"
            burgerColorHover="green"
            logo={logo}
            logoWidth="75px"
            logoHeight="75px"
            logoHoverSize="80px"
            logoHoverColor="black"
            logoAnimationTime="1"
            nav1justifyContent="center"
            nav2justifyContent="center"
            link1Text="Home"
            link2Text="Product"
            link3Text="Orders"
            link4Text="About"
            link1Url="/"
            link2Url="/product"
            link3Url="/order"
            link4Url="/about"
            link1Size="2vmax"
            link1Color="grey"
            link1ColorHover="orange"
            link1Margin="3vmax"
        // link1Padding="1vmax"


        />
    )
}

export default Header