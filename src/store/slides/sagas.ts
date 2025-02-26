import { call, put, take, fork } from "redux-saga/effects"
import { SlidesActionTypes, Slide } from "./types"
import {
  fetchSlidesRequest,
  fetchSlidesSuccess,
  fetchSlidesFailure,
} from "./actions"

// Função para buscar slides via API
const fetchSlidesApi = async () => {
  const response = await fetch("http://localhost:4000/slides")
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

  const data = await response.json() // ⬅️ Armazenar o resultado
  console.log("=============>:", data)
  return data
}

// Worker Saga para buscar slides
function* fetchSlidesSaga(): Generator {
  try {
    const slides: Slide[] = yield call(fetchSlidesApi)
    yield put(fetchSlidesSuccess(slides))
  } catch (error) {
    yield put(
      fetchSlidesFailure(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar slides",
      ),
    )
  }
}

// Watcher Saga
function* watchSlidesSagas(): Generator {
  while (true) {
    yield take(SlidesActionTypes.FETCH_SLIDES_REQUEST)
    // Usando fork para permitir a execução em paralelo, simulando takeLatest
    yield fork(fetchSlidesSaga)
  }
}

export default watchSlidesSagas
