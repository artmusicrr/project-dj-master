import { call, put, take, fork } from "redux-saga/effects"
import { GalleryActionTypes, GalleryTypes } from "./types"
import {
 
  fetchGallerySuccess,
  fetchGalleryFailure,
} from "./actions"

// Função para buscar slides via API
const fetchGalleryApi = async (): Promise<GalleryTypes[]> => {
  const response = await fetch("http://localhost:4000/gallery/images")
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

  const data: GalleryTypes[] = await response.json() // ⬅️ Armazenar o resultado
  console.log("=====GALLERY========>:", data)
  return data
}

// Worker Saga para buscar slides
function* fetchGallerySaga(): Generator<any, void, GalleryTypes[]> {
  try {
    const gallery: GalleryTypes[] = yield call(fetchGalleryApi)
    yield put(fetchGallerySuccess(gallery))
  } catch (error) {
    yield put(
      fetchGalleryFailure(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar slides",
      ),
    )
  }
}

// Watcher Saga
function* watchGallerySagas(): Generator {
  while (true) {
    yield take(GalleryActionTypes.FETCH_GALLERY_REQUEST)
    // Usando fork para permitir a execução em paralelo, simulando takeLatest
    yield fork(fetchGallerySaga)
  }
}

export default watchGallerySagas
