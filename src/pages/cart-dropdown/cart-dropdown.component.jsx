import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
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

export default connect(mapStateToProps)(CartDropdown);
