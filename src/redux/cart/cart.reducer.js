import { CartActionTypes } from "./cart.types";
import { addItemToCart, clearItemFromCart, removeItem } from "./cart.utils";

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
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        //or
        // cartItems: clearItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItem(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
