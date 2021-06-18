import { axios } from "../../lib/axios";
import { ProductTypes } from "../types";

export const setLandingProducts = (products = []) => ({
  type: ProductTypes.SET_LANDING_PRODUCTS,
  payload: products,
});

export const getLandingProducts = (category) => async (dispatch) => {
  const { data } = await axios.get(
    `/products/landing/${category.toLowerCase()}`
  );
  dispatch(setLandingProducts(data.products));
};

export const getProduct = (id) => async (dispatch) => {
  const { data } = await axios.get(`/products/product/${id}`);

  dispatch({
    type: ProductTypes.SET_PRODUCT,
    payload: { product: data.product, similar: data.similarProducts },
  });
};

export const getSearchProducts =
  (categories, sale, skip = 0) =>
  async (dispatch) => {
    const { data } = await axios.get(
      `/products/search/${categories}/${sale}/${skip}`
    );

    dispatch({
      type: ProductTypes.SEARCH_PRODUCTS,
      payload: { products: data.products ?? [], skip, total: data.count },
    });
  };
