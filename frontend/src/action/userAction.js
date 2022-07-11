import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/userConstants"
import axios from "axios"

export const login = (email, passowrd) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/login`, { email, passowrd }, config)
            console.log(data,"userAction");
        dispatch({type:LOGIN_SUCCESS,payload:data.user})

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}