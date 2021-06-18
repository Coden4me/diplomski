import { AuthTypes } from "../types/auth";

export const INITIAL_STATE = {
  token: null,
  _id: null,
  name: null,
  email: null,
  picture: null,
  isSubscribed: null,
  isAuthenticated: false,
  authLoading: true,
};

function AuthReducer(prevState = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthTypes.AUTH_RESET:
      return { ...INITIAL_STATE, authLoading: false };
    case AuthTypes.AUTH_SUCCESS:
      return {
        ...INITIAL_STATE,
        ...action.payload,
        authLoading: false,
        isAuthenticated: true,
      };
    case AuthTypes.AUTH_SET_LOADING:
      return { ...prevState, authLoading: action.payload.loading };
    default:
      return prevState;
  }
}

export default AuthReducer;
