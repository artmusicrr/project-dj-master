export interface ContactFormData {
  name: string
  email: string
  phone_number: string
  event_location: string
  event_date: string
  event_type: string
  message: string
}

export interface ContactResponse extends ContactFormData {
  id: number
  created_at: string
}

export interface ContactState {
  loading: boolean
  error: string | null
  success: boolean
  contacts: ContactResponse[]
}

export enum ContactActionTypes {
  SUBMIT_CONTACT_REQUEST = "SUBMIT_CONTACT_REQUEST",
  SUBMIT_CONTACT_SUCCESS = "SUBMIT_CONTACT_SUCCESS",
  SUBMIT_CONTACT_FAILURE = "SUBMIT_CONTACT_FAILURE",
  FETCH_CONTACTS_REQUEST = "FETCH_CONTACTS_REQUEST",
  FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS",
  FETCH_CONTACTS_FAILURE = "FETCH_CONTACTS_FAILURE",
  RESET_CONTACT_STATE = "RESET_CONTACT_STATE"
}