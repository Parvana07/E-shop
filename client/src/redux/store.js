import { createStore, applyMiddleware } from "redux";
//allows our browser to actually cache our store depending on certain configuration options
import { persistStore } from "redux-persist";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./root-saga";

import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

// const middlewares = [thunk];
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

//persistor is a persisted version of our store
export const persistor = persistStore(store);

export default { store, persistor };
