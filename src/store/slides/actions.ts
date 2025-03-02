import { SlidesActionTypes, Slide } from "./types"

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
