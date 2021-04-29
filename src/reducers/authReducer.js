import { initialState } from "./initialState";

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NAME_CHANGE":
      return {
        ...state,
        name: action.payload,
      };
    case "EMAIL_CHANGE":
      return {
        ...state,
        email: action.payload,
      };
    case "PASSWORD_CHANGE":
      return {
        ...state,
        password: action.payload,
      };

    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.payload,
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "SIGNIN_ERROR":
      return {
        ...state,
        authError: action.payload,
      };

    case "CLEAR_INPUTS":
      return {
        ...state,
        name: "",
        email: "",
        password: "",
      };
    case "SET_LOGGEDIN_USER":
      return {
        ...state,
        loggedInUser: action.user,
      };
    default:
      return state;
  }
};

export default authReducer;
