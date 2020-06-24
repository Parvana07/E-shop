import React from "react";
import StripeCheckout from "react-stripe-checkout";

import "./stripe-button.styles.scss";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51GxMjMEgA47yUxf8fySOi0nAZQpg7t6GOhHzsskNlSEkVE7mIDuzgGQcAQvx2WiKa2JO5qWGTfHz8bxB5Cctuu3M00R8k7aBlG";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="pay now"
      name="E-Shop"
      amount={priceForStripe}
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
