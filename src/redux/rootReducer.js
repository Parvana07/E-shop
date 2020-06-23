import { combineReducers } from "redux";
//besides store we need persist reducer as well
import { persistReducer } from "redux-persist";
//storage - actual localStorage object on our window browser(I want to use local storage as my default storage)
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopDataReducer from "./shop/shop.reducer";

//configuration. the only reducer we want to persist is cart
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

//wee need to call combineReducers as rootReducer
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopDataReducer,
});

// export default combineReducers({
//   user: userReducer,
//   cart: cartReducer,
// });

export default persistReducer(persistConfig, rootReducer);
