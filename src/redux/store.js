import { createStore, applyMiddleware } from "redux";
//allows our browser to actually cache our store depending on certain configuration options
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./rootReducer";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
//persistor is a persisted version of our store
export const persistor = persistStore(store);

export default { store, persistor };
