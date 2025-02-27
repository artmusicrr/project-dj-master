import { combineReducers } from "@reduxjs/toolkit";
import slidesReducer from "./slides/reducer";
import galleryReducer from "./gallery/reducer";

const rootReducer = combineReducers({
  slides: slidesReducer,
  gallery: galleryReducer,
});

export default rootReducer;