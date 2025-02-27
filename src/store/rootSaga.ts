import { all, fork } from "redux-saga/effects";
import watchSlidesSagas from "./slides/sagas";
import watchGallerySagas from "./gallery/sagas";

export default function* rootSaga() {
  yield all([
    fork(watchSlidesSagas),
    fork(watchGallerySagas),
  ]);
}