import { axios } from "../../lib/axios";
import { UserDataTypes } from "../types";

export const setUserData = (
  payload = { isSubscribed: false, compareProducts: [] }
) => ({ type: UserDataTypes.SET_USER_DATA, payload });

export const setIsSubscribed = (isSubscribed = false) => ({
  type: UserDataTypes.SET_USER_DATA,
  payload: { isSubscribed },
});

export const setComparedProducts = (compareProducts = []) => ({
  type: UserDataTypes.SET_USER_DATA,
  payload: { compareProducts },
});

export const setComparedProductsView = (compareProductsView = []) => ({
  type: UserDataTypes.SET_COMPARED_PRODUCTS_VIEW,
  payload: { compareProductsView },
});

export const getUserData = async (dispatch) => {
  const { data } = await axios.get(`/user-data`);

  dispatch(setUserData(data));
};
