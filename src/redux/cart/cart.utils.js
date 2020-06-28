export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === existingCartItem.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }
};

export const clearItemFromCart = (cartItems, removeItem) => {
  return cartItems.filter((cartItem) => cartItem.id !== removeItem.id);
};

// export const removeItem = (cartItems, item) => {
//   return cartItems.map((cartItem) =>
//     cartItem.id === item.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : null
//   );
// };

export const removeItem = (cartItems, cartItemToRemove) => {
  // console.log("I am remove", cartItemToRemove);
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // console.log("I am existingCartItem", existingCartItem);
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
