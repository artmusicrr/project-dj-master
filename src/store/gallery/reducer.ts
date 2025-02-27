// src/store/slides/reducer.ts
import { combineReducers } from "redux"
import { GalleryState, GalleryActionTypes } from "./types"
import { AnyAction } from "redux"

// Estado inicial do reducer
const initialState: GalleryState = {
  images: [],
  loading: false,
  error: null,
}

// Reducer específico para slides
export const galleryReducer = (
  state = initialState,
  action: AnyAction,
): GalleryState => {
  switch (action.type) {
    case GalleryActionTypes.FETCH_GALLERY_REQUEST:
      console.log(
        "FETCH_SLIDES_REQUEST REDUCER",
        GalleryActionTypes.FETCH_GALLERY_REQUEST,
        action, // ⬅️ Ação disparada
      )
      return { ...state, loading: true, error: null, images: [] }

    case GalleryActionTypes.FETCH_GALLERY_SUCCESS:
      return { ...state, loading: false, images: action.payload, error: null }

    case GalleryActionTypes.FETCH_GALLERY_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

// Combina o slidesReducer em um rootReducer
const rootReducer = combineReducers({
  gallery: galleryReducer,
})

export default rootReducer
