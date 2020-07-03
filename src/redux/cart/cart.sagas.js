import { takeLatest, all, call, put } from "redux-saga/effects";

import { userActionTypes } from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearCartOnSignOut() {
  //   yield console.log("hi");
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield console.log("hi");
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
