import { GalleryActionTypes, GalleryTypes } from "./types"

export const fetchGalleryRequest = () => (
  console.log("fetchGalleryRequest", GalleryActionTypes.FETCH_GALLERY_REQUEST),
  {
    type: GalleryActionTypes.FETCH_GALLERY_REQUEST,
  }
)

export const fetchGallerySuccess = (Image: GalleryTypes[]) => ({
  type: GalleryActionTypes.FETCH_GALLERY_SUCCESS,
  payload: Image,
})

export const fetchGalleryFailure = (error: string) => ({
  type: GalleryActionTypes.FETCH_GALLERY_FAILURE,
  payload: error,
})
