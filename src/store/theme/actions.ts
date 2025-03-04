import { ThemeActionTypes, ThemeMode } from './types'

export const toggleTheme = () => ({
  type: ThemeActionTypes.TOGGLE_THEME
})

export const setTheme = (mode: ThemeMode) => ({
  type: ThemeActionTypes.SET_THEME,
  payload: mode
})