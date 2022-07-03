import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/constants";

//Get All Products
export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        const { data } = await axios.get("api/v1/products")
        // console.log(data,"front");

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })

    }
}
//Get Product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/products/${id}`)
        // console.log(data,"front");

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}