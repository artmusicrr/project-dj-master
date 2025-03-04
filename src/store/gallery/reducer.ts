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
    case GalleryActionTypes.DELETE_IMAGE_REQUEST:
      return { ...state, loading: true, error: null }

    case GalleryActionTypes.FETCH_GALLERY_SUCCESS:
      return {
        ...state,
        loading: false,
        images: Array.isArray(action.payload) ? action.payload : [],
        error: null
      }

    case GalleryActionTypes.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: Array.isArray(state.images)
          ? [...state.images, action.payload]
          : [action.payload],
        error: null,
      }

    case GalleryActionTypes.DELETE_IMAGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        images: Array.isArray(state.images)
          ? state.images.filter(img => {
            if (typeof img === 'string') {
              return img !== action.payload
            }
            return img.id !== action.payload && img.id_image !== action.payload
          })
          : [],
        error: null,
      }
    }

    case GalleryActionTypes.FETCH_GALLERY_FAILURE:
    case GalleryActionTypes.UPLOAD_IMAGE_FAILURE:
    case GalleryActionTypes.DELETE_IMAGE_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}


const rootReducer = combineReducers({
  gallery: galleryReducer,
})

export default rootReducer
