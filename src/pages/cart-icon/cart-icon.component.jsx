import React from "react";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  // console.log(itemCount);
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

//using selector for memoization
const mapStateToProps = (state) => {
  // console.log("I am being called");
  return {
    itemCount: selectCartItemsCount(state),
  };
};

// const mapStateToProps = ({ cart: { cartItems } }) => {
//   console.log("I am being called");
//   return {
//     itemCount: cartItems.reduce((acc, ele) => acc + ele.quantity, 0),
//   };
// };
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
