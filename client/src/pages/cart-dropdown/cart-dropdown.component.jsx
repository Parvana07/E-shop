import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import CustomButton from "../customButton/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
        <CustomButton
          onClick={() => {
            history.push("/checkout");
            dispatch(toggleCartHidden());
          }}
        >
          GO TO CHECKOUT
        </CustomButton>
      </div>
    </div>
  );
};

//using selectore for memoization
const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

// const mapStateToProps = ({ cart: { cartItems } }) => {
//   // console.log("I am being called");
//   return {
//     cartItems: cartItems,
//   };
// };

//other way of getting info
// const mapStateToProps = (state) => ({
//   cartItems: state.cart.cartItems,
// });

//all HOC take and return components. withRouter will be what passes the match history and locations objects
//that we first covered when we're looking at our with router component into the component that is being wrapped.

export default withRouter(connect(mapStateToProps)(CartDropdown));
