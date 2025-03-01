import { fork } from "redux-saga/effects";
import watchSlidesSagas from "./slides/sagas";
import watchGallerySagas from "./gallery/sagas";

export default function* rootSaga() {
  yield fork(watchSlidesSagas);
  yield fork(watchGallerySagas);
}