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
      console.log(
        "FETCH_SLIDES_REQUEST",
        SlidesActionTypes.FETCH_SLIDES_REQUEST,
        action, // ⬅️ Ação disparada
      )
      return { ...state, loading: true, error: null, slides: [] }

    case SlidesActionTypes.FETCH_SLIDES_SUCCESS:
      return { ...state, loading: false, slides: action.payload, error: null }

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
