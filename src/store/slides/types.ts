export interface Slide {
  id: string | number
  title: string
  sub_title: string
  text: string
  any_text: string
  color_title: string
  color_sub_title: string
  color_text: string
  color_any_text: string
  image_url: string
  font_size_title: number
  font_weight_title: string
  font_family_title: string
  font_size_sub_title: number
  font_weight_sub_title: string
  font_family_sub_title: string
  font_size_text: number
  font_weight_text: string
  font_family_text: string
  font_size_any_text: number
  font_weight_any_text: string
  font_family_any_text: string
}

export interface SlidesState {
  slides: Slide[]
  loading: boolean
  error: string | null
}

export enum SlidesActionTypes {
  FETCH_SLIDES_REQUEST = "FETCH_SLIDES_REQUEST",
  FETCH_SLIDES_SUCCESS = "FETCH_SLIDES_SUCCESS",
  FETCH_SLIDES_FAILURE = "FETCH_SLIDES_FAILURE",
}
