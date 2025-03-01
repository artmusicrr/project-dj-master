import { GalleryActionTypes, GalleryTypes, UploadImagePayload } from "./types"

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

export const uploadImageRequest = (payload: UploadImagePayload) => ({
  type: GalleryActionTypes.UPLOAD_IMAGE_REQUEST,
  payload,
})

export const uploadImageSuccess = (image: GalleryTypes) => ({
  type: GalleryActionTypes.UPLOAD_IMAGE_SUCCESS,
  payload: image,
})

export const uploadImageFailure = (error: string) => ({
  type: GalleryActionTypes.UPLOAD_IMAGE_FAILURE,
  payload: error,
})
