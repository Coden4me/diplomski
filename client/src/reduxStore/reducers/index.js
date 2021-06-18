import { combineReducers } from "redux";

// reducers
import product from "./product";
import auth from "./auth";
import newsletter from "./newsletter";
import userData from "./userData";

export const rootReducer = combineReducers({
  product,
  auth,
  newsletter,
  userData,
});
