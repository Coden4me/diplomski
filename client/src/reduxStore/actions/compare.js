import { axios } from "../../lib/axios";
import { setUserData, setComparedProductsView } from "./userData";

export const addToCompare = (id) => async (dispatch) => {
  const { data } = await axios.post("/compare", { id });

  if (data.products) {
    dispatch(setUserData({ compareProducts: data.products }));
  }

  dispatch(getProductsToCompare);
};

export const removeFromCompare = (id) => async (dispatch) => {
  const { data } = await axios.delete("/compare", { data: { id } });

  if (data.products) {
    dispatch(setUserData({ compareProducts: data.products }));
  }

  dispatch(getProductsToCompare);
};

export const getProductsToCompare = async (dispatch) => {
  const { data } = await axios.get("/compare");

  if (data.products) {
    dispatch(setComparedProductsView(data.products));
  }
};
