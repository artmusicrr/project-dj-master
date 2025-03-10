import { call, put, take, fork, Effect } from "redux-saga/effects"
import { ContactActionTypes, ContactFormData, ContactResponse } from "./types"
import { 
  submitContactSuccess, 
  submitContactFailure, 
  submitContactRequest,
  fetchContactsSuccess,
  fetchContactsFailure
} from "./actions"
import { getUserLocalStorage } from "../../contexts/AuthProvider/util"

const API_BASE_URL = process.env.REACT_APP_API_PROD;
console.log("API_BASE_URL:", API_BASE_URL);

const submitContactApi = async (formData: ContactFormData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/contact/form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
  }
}

const fetchContactsApi = async (): Promise<ContactResponse[]> => {
  const user = getUserLocalStorage();
  
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user?.token}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }
  
  return response.json();
};


function* submitContactSaga(action: ReturnType<typeof submitContactRequest>) {
  try {
    const submitFn = () => submitContactApi(action.payload)
    yield call(submitFn)
    yield put(submitContactSuccess())
  } catch (error) {
    yield put(
      submitContactFailure(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao enviar formulário"
      )
    )
  }
}

function* fetchContactsSaga() {
  try {
    const contacts: ContactResponse[] = yield call(fetchContactsApi)
    yield put(fetchContactsSuccess(contacts))
  } catch (error) {
    yield put(
      fetchContactsFailure(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar formulários"
      )
    )
  }
}

function* watchContactSagas() {
  while (true) {
    const action = (yield take([
      ContactActionTypes.SUBMIT_CONTACT_REQUEST,
      ContactActionTypes.FETCH_CONTACTS_REQUEST
    ])) as ReturnType<typeof submitContactRequest>

    if (action.type === ContactActionTypes.SUBMIT_CONTACT_REQUEST) {
      yield fork(() => submitContactSaga(action))
    } else if (action.type === ContactActionTypes.FETCH_CONTACTS_REQUEST) {
      yield fork(fetchContactsSaga)
    }
  }
}

export default watchContactSagas