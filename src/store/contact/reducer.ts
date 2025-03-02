import { ContactState, ContactActionTypes } from "./types"
import { AnyAction } from "redux"

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
  contacts: []
}

export const contactReducer = (
  state = initialState,
  action: AnyAction,
): ContactState => {
  switch (action.type) {
    case ContactActionTypes.SUBMIT_CONTACT_REQUEST:
    case ContactActionTypes.FETCH_CONTACTS_REQUEST:
      return { ...state, loading: true, error: null }

    case ContactActionTypes.SUBMIT_CONTACT_SUCCESS:
      return { ...state, loading: false, error: null, success: true }

    case ContactActionTypes.FETCH_CONTACTS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        error: null,
        contacts: action.payload
      }

    case ContactActionTypes.SUBMIT_CONTACT_FAILURE:
    case ContactActionTypes.FETCH_CONTACTS_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}