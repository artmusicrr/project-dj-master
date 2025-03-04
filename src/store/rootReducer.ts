import { combineReducers } from "@reduxjs/toolkit";
import { slidesReducer } from "./slides/reducer";
import galleryReducer from "./gallery/reducer";
import { contactReducer } from "./contact/reducer";
import { themeReducer } from "./theme/reducer";

const rootReducer = combineReducers({
  slides: slidesReducer,
  gallery: galleryReducer,
  contact: contactReducer,
  theme: themeReducer,
});

export default rootReducer;