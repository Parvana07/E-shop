import SHOP_DATA from "../../pages/shop/shop.data";

const INITIAL_STATE = {
  collection: SHOP_DATA,
};

const shopDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shopDataReducer;
