export enum ThemeActionTypes {
  TOGGLE_THEME = '@theme/TOGGLE_THEME',
  SET_THEME = '@theme/SET_THEME'
}

export type ThemeMode = 'light' | 'dark'

export interface ThemeState {
  mode: ThemeMode
}

interface ToggleThemeAction {
  type: ThemeActionTypes.TOGGLE_THEME
}

interface SetThemeAction {
  type: ThemeActionTypes.SET_THEME
  payload: ThemeMode
}

export type ThemeActions = ToggleThemeAction | SetThemeAction