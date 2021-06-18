import { axios } from "../../lib/axios";
import { AuthToken } from "../../lib/decode";

// types
import { AuthTypes } from "../types/auth";

export const authSuccess = (token) => ({
  type: AuthTypes.AUTH_SUCCESS,
  payload: { ...AuthToken.getTokenData(token), token },
});

export const authReset = () => ({
  type: AuthTypes.AUTH_RESET,
  payload: {},
});

export const logoutUser = async (dispatch) => {
  const { status } = await axios.post("/auth/logout");

  if (status === 200) return dispatch(authReset());

  return undefined;
};

export const refreshToken =
  (firstCheck = false) =>
  async (dispatch) => {
    dispatch({
      type: AuthTypes.AUTH_SET_LOADING,
      payload: { loading: true },
    });
    const { data } = await axios.get(`/auth/refresh`, {
      params: { firstCheck },
    });

    if (data?.accessToken) {
      return dispatch(authSuccess(data.accessToken));
    }

    dispatch(logoutUser);
    return dispatch(authReset());
  };
