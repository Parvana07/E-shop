import { CartActionTypes } from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITIAl_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAl_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
        // cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
