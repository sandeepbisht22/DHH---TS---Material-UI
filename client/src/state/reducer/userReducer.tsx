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

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
    case SIGNUP_USER_SUCCESS:
    case LOGIN_VIA_GOOGLE:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case SIGNUP_FAIL:
    case LOGIN_USER_FAIL:
    case AUTH_FAIL:
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
