import { call, put, take, fork } from "redux-saga/effects"
import { SlidesActionTypes, Slide } from "./types"
import {
  fetchSlidesRequest,
  fetchSlidesSuccess,
  fetchSlidesFailure,
} from "./actions"
import { getUserLocalStorage } from "../../contexts/AuthProvider/util"

// Função para buscar slides via API
const fetchSlidesApi = async () => {
  const user = getUserLocalStorage()
  const response = await fetch("http://localhost:4000/title", {
    headers: {
      "Authorization": `Bearer ${user?.token}`
    }
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  
  const data = await response.json()
  // Mapear e ordenar os slides por ID
  const mappedSlides = data.map((item: any) => ({
    id: item.id,
    title: item.title || "",
    sub_title: item.sub_title || "",
    text: item.text || "",
    any_text: item.any_text || "",
    color_title: item.color_title || "#000000",
    color_sub_title: item.color_sub_title || "#000000",
    color_text: item.color_text || "#000000",
    color_any_text: item.color_any_text || "#000000",
    font_size_title: item.font_size_title || 16,
    font_weight_title: item.font_weight_title || "normal",
    font_family_title: item.font_family_title || "Arial",
    font_size_sub_title: item.font_size_sub_title || 16,
    font_weight_sub_title: item.font_weight_sub_title || "normal",
    font_family_sub_title: item.font_family_sub_title || "Arial",
    font_size_text: item.font_size_text || 16,
    font_weight_text: item.font_weight_text || "normal",
    font_family_text: item.font_family_text || "Arial",
    font_size_any_text: item.font_size_any_text || 16,
    font_weight_any_text: item.font_weight_any_text || "normal",
    font_family_any_text: item.font_family_any_text || "Arial",
    image_url: item.image_url || "",
  }))

  // Ordenar os slides pelo ID
  return mappedSlides.sort((a: Slide, b: Slide) => {
    const idA = Number(a.id)
    const idB = Number(b.id)
    return idA - idB
  })
}

// Worker Saga para buscar slides
function* fetchSlidesSaga(): Generator<any, void, Slide[]> {
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
