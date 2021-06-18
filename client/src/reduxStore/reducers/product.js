import { ProductTypes } from "../types";

const INITIAL_STATE = {
  landing: [],
  products: [],
  total: 0,
  product: null,
  similar: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductTypes.SET_LANDING_PRODUCTS: {
      return {
        ...state,
        landing: action.payload,
      };
    }
    case ProductTypes.SET_PRODUCT: {
      return {
        ...state,
        product: action.payload.product,
        similar: action.payload.similar,
      };
    }
    case ProductTypes.SEARCH_PRODUCTS: {
      const newP = action.payload.products;
      const products = !action.payload.skip
        ? newP
        : [...state.products, ...newP];
      // const rsp = {...state, products };

      // if (action.payload.skip) {
      //   rsp.total = action.payload.total;
      // }
      return { ...state, products, total: action.payload.total };
    }
    default:
      return { ...state };
  }
};

export default productReducer;
