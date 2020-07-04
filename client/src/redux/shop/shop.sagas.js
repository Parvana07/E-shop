//takeEvery listens to every action of a specific type we pass to it
import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";

import { fetchCollectionSuccess, fetchCollectionFailure } from "./shop.actions";

import ShopActionTypes from "./shop.types";

//what saga middleware does is its whole purpose is to tun these sagas all concurrently
//takeEvery creates a non blocking call in order to not stop our application to continue running, it does not pause the javascript for anything inside of
//our fecth collections async to come back. alternatively
export function* fecthCollectionsAsync() {
  yield console.log("I am fired");

  try {
    const collectionRef = firestore.collection("collection");

    const snapshot = yield collectionRef.get();
    //call is the effect inside of our generator function that invokes the method, it is a method that takes as its first argument some function or method
    // and then the subsequent arguments will be the parameters that you passed into this function call
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    yield put(fetchCollectionSuccess(collectionsMap));
  } catch (error) {
    //instead of dispatch keyword sagas use put effect. Put is the saga effect for creating action and it is exactly like dispatch.
    //The only difference is we have to yield it
    yield put(fetchCollectionFailure(error.message));
  }
}
//what this saga does with the effect is it's going to pause whenever a specific action type that we want comes in

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTION_START,
    fecthCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
