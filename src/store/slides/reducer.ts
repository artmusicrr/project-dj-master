// src/store/slides/reducer.ts
import { combineReducers } from "redux"
import { SlidesState, SlidesActionTypes } from "./types"
import { AnyAction } from "redux"

// Estado inicial do reducer
const initialState: SlidesState = {
  slides: [],
  loading: false,
  error: null,
}

// Reducer específico para slides
export const slidesReducer = (
  state = initialState,
  action: AnyAction,
): SlidesState => {
  switch (action.type) {
    case SlidesActionTypes.FETCH_SLIDES_REQUEST:
      return { ...state, loading: true, error: null }

    case SlidesActionTypes.FETCH_SLIDES_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        slides: Array.isArray(action.payload) ? action.payload : [], 
        error: null 
      }

    case SlidesActionTypes.FETCH_SLIDES_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

// Combina o slidesReducer em um rootReducer
const rootReducer = combineReducers({
  slides: slidesReducer,
})

export default rootReducer
