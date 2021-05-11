import { initialState } from "./initialState";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
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

    case "SET_LOGGEDIN_USER":
      return {
        ...state,
        loggedInUser: action.user,
        isAuthenticating: false,
      };
    default:
      return state;
  }
};

export default authReducer;
