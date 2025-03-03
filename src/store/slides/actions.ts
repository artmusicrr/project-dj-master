import { SlidesActionTypes, Slide, UpdateSlidePayload } from "./types"

export const fetchSlidesRequest = () => ({
  type: SlidesActionTypes.FETCH_SLIDES_REQUEST,
})

export const fetchSlidesSuccess = (slides: Slide[]) => ({
  type: SlidesActionTypes.FETCH_SLIDES_SUCCESS,
  payload: slides,
})

export const fetchSlidesFailure = (error: string) => ({
  type: SlidesActionTypes.FETCH_SLIDES_FAILURE,
  payload: error,
})

export const updateSlideRequest = (payload: UpdateSlidePayload) => ({
  type: SlidesActionTypes.UPDATE_SLIDE_REQUEST,
  payload,
})

export const updateSlideSuccess = (slide: Slide) => ({
  type: SlidesActionTypes.UPDATE_SLIDE_SUCCESS,
  payload: slide,
})

export const updateSlideFailure = (error: string) => ({
  type: SlidesActionTypes.UPDATE_SLIDE_FAILURE,
  payload: error,
})
