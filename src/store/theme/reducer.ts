import { ThemeState, ThemeActions, ThemeActionTypes, ThemeMode } from './types'

const initialState: ThemeState = {
  mode: 'light'
}

export const themeReducer = (state = initialState, action: ThemeActions): ThemeState => {
  switch (action.type) {
    case ThemeActionTypes.TOGGLE_THEME:
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light'
      }
    case ThemeActionTypes.SET_THEME:
      return {
        ...state,
        mode: action.payload
      }
    default:
      return state
  }
}