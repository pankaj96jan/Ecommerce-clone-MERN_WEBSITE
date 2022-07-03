import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/constants";

const productinitialState = { products: [] }
const productDetailsInitialState = { productDetails: [] }
export const productReducer = (state = productinitialState, action) => {
    // console.log(action.payload, "reducer");
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.Product,
                productCount: action.payload.productCount
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const productDetailsReducer = (state = productDetailsInitialState, action) => {
    // console.log(action.payload, "reducer product details");
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}