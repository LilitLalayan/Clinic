import { combineReducers } from "redux";
import authReducer from "./authReducer";
import shopOperations from "./shopOperations"
const rootReducer = combineReducers({
  auth: authReducer,
  
});

export default rootReducer;
