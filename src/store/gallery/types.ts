export interface GalleryTypes {
  id_image: string
  description: string
  image_url?: string
  id: string;
  alt: string;
  src: string
}

export interface GalleryState {
  images: GalleryTypes[]
  loading: boolean
  error: string | null
}

export enum GalleryActionTypes {
  FETCH_GALLERY_REQUEST = "FETCH_GALLERY_REQUEST",
  FETCH_GALLERY_SUCCESS = "FETCH_GALLERY_SUCCESS",
  FETCH_GALLERY_FAILURE = "FETCH_GALLERY_FAILURE",
  //UPDATE_SLIDE = "UPDATE_SLIDE",
}
