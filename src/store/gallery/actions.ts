import { GalleryActionTypes, GalleryTypes, UploadImagePayload, DeleteImagePayload } from "./types"

export const fetchGalleryRequest = () => ({
  type: GalleryActionTypes.FETCH_GALLERY_REQUEST,
})

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

// Novas actions para exclusão de imagem
export const deleteImageRequest = (payload: DeleteImagePayload) => ({
  type: GalleryActionTypes.DELETE_IMAGE_REQUEST,
  payload,
})

export const deleteImageSuccess = (imageId: string) => ({
  type: GalleryActionTypes.DELETE_IMAGE_SUCCESS,
  payload: imageId,
})

export const deleteImageFailure = (error: string) => ({
  type: GalleryActionTypes.DELETE_IMAGE_FAILURE,
  payload: error,
})