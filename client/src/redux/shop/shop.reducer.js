import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  collection: null,
  isFetching: false,
  errorMessage: "",
};

const shopDataReducer = (state = INITIAL_STATE, action) => {
  // console.log("payload", action.payload);
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTION_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collection: action.payload,
      };
    case ShopActionTypes.FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopDataReducer;
