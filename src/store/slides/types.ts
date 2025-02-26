export interface Slide {
  id: string
  title: string
  sub_title: string
  text: string
  color_title: string
  color_sub_title: string
  color_text: string
  font_size_title?: number
  font_size_sub_title?: number
  font_size_text?: number
  font_weight_title?: string
  font_weight_sub_title?: string
  font_weight_text?: string
  font_family_title?: string
  font_family_sub_title?: string
  font_family_text?: string
  image_url?: string
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
  //UPDATE_SLIDE = "UPDATE_SLIDE",
}
