import { UserDataTypes } from "../types";

export const INITIAL_STATE = {
  isSubscribed: null,
  compareProducts: [],
  compareProductsView: [],
};

function AuthReducer(prevState = INITIAL_STATE, action) {
  switch (action.type) {
    case UserDataTypes.SET_USER_DATA:
      return { ...prevState, ...action.payload };
    case UserDataTypes.SET_COMPARED_PRODUCTS:
      return { ...prevState, ...action.payload };
    case UserDataTypes.SET_IS_SUBSCRIBED:
      return { ...prevState, ...action.payload };
    case UserDataTypes.SET_COMPARED_PRODUCTS_VIEW:
      return { ...prevState, ...action.payload };
    default:
      return prevState;
  }
}

export default AuthReducer;
