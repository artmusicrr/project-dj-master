import { ContactActionTypes, ContactFormData, ContactResponse } from "./types"

export const submitContactRequest = (formData: ContactFormData) => ({
  type: ContactActionTypes.SUBMIT_CONTACT_REQUEST,
  payload: formData,
})

export const submitContactSuccess = () => ({
  type: ContactActionTypes.SUBMIT_CONTACT_SUCCESS,
})

export const submitContactFailure = (error: string) => ({
  type: ContactActionTypes.SUBMIT_CONTACT_FAILURE,
  payload: error,
})

export const fetchContactsRequest = () => ({
  type: ContactActionTypes.FETCH_CONTACTS_REQUEST,
})

export const fetchContactsSuccess = (contacts: ContactResponse[]) => ({
  type: ContactActionTypes.FETCH_CONTACTS_SUCCESS,
  payload: contacts,
})

export const fetchContactsFailure = (error: string) => ({
  type: ContactActionTypes.FETCH_CONTACTS_FAILURE,
  payload: error,
})

export const resetContactState = () => ({
  type: ContactActionTypes.RESET_CONTACT_STATE
})