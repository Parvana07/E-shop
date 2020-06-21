import React from "react";
import { connect } from "react-redux";

import CustomButton from "../customButton/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <CustomButton>GO TO CHECKOUT</CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});

//other way of getting info
// const mapStateToProps = (state) => ({
//   cartItems: state.cart.cartItems,
// });

export default connect(mapStateToProps)(CartDropdown);
