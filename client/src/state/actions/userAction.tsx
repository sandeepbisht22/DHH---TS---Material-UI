import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER,
  LOGOUT_USER,
  AUTH_FAIL,
  CLEAR_ERROR,
  LOGIN_VIA_GOOGLE,
} from "../types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthnToken";

//Will store logged in or Signed up user
export const loadUser = () => async (dispatch) => {
  console.log("load User is called");
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/auth");
    console.log("loading user with value" + res);
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
    console.log("loading user  completed");
  } catch (error) {
    //TODO
    dispatch({
      type: AUTH_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//Register User on database
export const signUpUser = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    //Have  to make rest call for registering user
    const res = await axios.post("/user", formData, config);

    dispatch({
      type: SIGNUP_USER_SUCCESS,
      payload: res.data,
    });
    loadUser()(dispatch);
  } catch (errors) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: errors.response.data.msg,
    });
  }
};

// Login User when check with Database
export const loginUser = (formData) => async (dispatch) => {
  console.log("login user is called");

  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    //Will make a rest call to check if we can login and the set token returned
    const res = await axios.post("/auth", formData, config);
    console.log(
      "dispatching for LOGIN_USER_SUCCESS with res" + JSON.stringify(res.data)
    );
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data,
    });
    console.log("LOGIN_USER_SUCCESS returned");
    loadUser()(dispatch);
  } catch (errors) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: errors.response.data.msg,
    });
  }
};

//Loging in user via google
export const loginViaGoogle = (email) => async (dispatch) => {
  const res = await axios.get(`/user/${email}`);
  console.log("User res from google info");
  console.log(JSON.stringify(res));
  dispatch({
    type: LOGIN_VIA_GOOGLE,
    payload: res.data,
  });
};

//Logout USer
export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};

//Clear all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
