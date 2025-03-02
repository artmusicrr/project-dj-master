import { call, put, Effect } from "redux-saga/effects"
import { take, fork } from "redux-saga/effects"
import { GalleryActionTypes, GalleryTypes, UploadImagePayload, DeleteImagePayload } from "./types"
import {
  fetchGallerySuccess,
  fetchGalleryFailure,
  uploadImageSuccess,
  uploadImageFailure,
  uploadImageRequest,
  deleteImageFailure,
  deleteImageRequest,
  deleteImageSuccess, 
} from "./actions"
import { getUserLocalStorage } from "../../contexts/AuthProvider/util"

// API functions
const fetchGalleryApi = async (): Promise<GalleryTypes[]> => {
  try {
    const user = getUserLocalStorage()
    const response = await fetch("http://localhost:4000/gallery/images", {
      headers: {
        "Authorization": `Bearer ${user?.token}`
      }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const data = await response.json()
    console.log('Dados recebidos da galeria:', data)
    return data
  } catch (error) {
    console.error('Erro ao buscar imagens:', error)
    throw error
  }
}

const uploadImageApi = async (payload: UploadImagePayload): Promise<GalleryTypes> => {
  try {
    if (!payload.image) {
      throw new Error('Arquivo não fornecido')
    }
    const formData = new FormData()
    formData.append("image", payload.image)
    formData.append("description", payload.description)
    
    const user = getUserLocalStorage()
    const response = await fetch("http://localhost:4000/gallery/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user?.token}`
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erro no upload: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('Resposta do servidor após upload:', data)
    return data
  } catch (error) {
    console.error('Erro detalhado no uploadImageApi:', error)
    throw error
  }
}

// Função API para deletar imagem
const deleteImageApi = async (payload: DeleteImagePayload): Promise<string> => {
  try {
    const user = getUserLocalStorage()
    const response = await fetch(`http://localhost:4000/gallery/image/${payload.filename}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${user?.token}`
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
    
    return payload.imageId;
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    throw error;
  }
}

// Saga Workers
function* fetchGallerySaga(): Generator<Effect, void, GalleryTypes[]> {

  try {
    const gallery: GalleryTypes[] = yield call(fetchGalleryApi)
    yield put(fetchGallerySuccess(gallery))
  } catch (error) {
    yield put(
      fetchGalleryFailure(
        error instanceof Error
          ? error.message

          : "Erro desconhecido ao buscar imagens"
      )
    )
  }
}

function* uploadImageSaga(payload: UploadImagePayload): Generator<Effect, void, GalleryTypes> {
  try {
    console.log('Iniciando saga de upload com payload:', {
      fileName: payload.image.name,
      fileSize: payload.image.size,
      fileType: payload.image.type,
      description: payload.description
    })
    
    const image: GalleryTypes = yield call(() => uploadImageApi(payload))
    yield put(uploadImageSuccess(image))
  } catch (error) {
    console.error('Erro na saga de upload:', error)
    yield put(
      uploadImageFailure(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao fazer upload da imagem"
      )
    )
  }
}

function* deleteImageSaga(action: ReturnType<typeof deleteImageRequest>): Generator<Effect, void, string> {
  try {
    const payload = action.payload;
    console.log('Iniciando saga de exclusão com payload:', payload);
    
    const deletedImageId: string = yield call(() => deleteImageApi(payload));
    yield put(deleteImageSuccess(deletedImageId));
  } catch (error) {
    console.error('Erro na saga de exclusão:', error);
    yield put(
      deleteImageFailure(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao excluir a imagem"
      )
    );
  }
}

// Root Saga Watcher
function* watchGallerySagas(): Generator<Effect, void, any> {
  while (true) {
    const action = yield take([
      GalleryActionTypes.FETCH_GALLERY_REQUEST,
      GalleryActionTypes.UPLOAD_IMAGE_REQUEST,
      GalleryActionTypes.DELETE_IMAGE_REQUEST,
    ]);

    if (action.type === GalleryActionTypes.FETCH_GALLERY_REQUEST) {
      yield fork(fetchGallerySaga);
    } else if (action.type === GalleryActionTypes.UPLOAD_IMAGE_REQUEST) {
      const uploadTask = () => uploadImageSaga(action.payload);
      yield fork(uploadTask);
    } else if (action.type === GalleryActionTypes.DELETE_IMAGE_REQUEST) {
      // Criamos uma função wrapper para garantir tipagem correta
      const deleteTask = () => deleteImageSaga(action as ReturnType<typeof deleteImageRequest>);
      yield fork(deleteTask);
    }
  }
}

export default watchGallerySagas
