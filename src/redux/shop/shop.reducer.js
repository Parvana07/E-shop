// import SHOP_DATA from "../../pages/shop/shop.data";
import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  // collection: SHOP_DATA,
  collection: null,
};

const shopDataReducer = (state = INITIAL_STATE, action) => {
  // console.log("payload", action.payload);
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collection: action.payload,
      };
    default:
      return state;
  }
};

export default shopDataReducer;
