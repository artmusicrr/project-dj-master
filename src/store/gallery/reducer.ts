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


export const galleryReducer = (
  state = initialState,
  action: AnyAction,
): GalleryState => {
  switch (action.type) {
    case GalleryActionTypes.FETCH_GALLERY_REQUEST:

    case GalleryActionTypes.UPLOAD_IMAGE_REQUEST:
      return { ...state, loading: true, error: null }


    case GalleryActionTypes.FETCH_GALLERY_SUCCESS:
      return { ...state, loading: false, images: action.payload, error: null }


    case GalleryActionTypes.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...state.images, action.payload],
        error: null,
      }

    case GalleryActionTypes.FETCH_GALLERY_FAILURE:
    case GalleryActionTypes.UPLOAD_IMAGE_FAILURE:

      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}


const rootReducer = combineReducers({
  gallery: galleryReducer,
})

export default rootReducer
