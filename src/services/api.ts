import { SlideData } from "../types/typesAdm"
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:4000/title",
})

//

export const updateText = async (
  query: string,
  id_text: string,
  updateData: SlideData,
) => {
  try {
    const response = await api.patch(`/${query}/${id_text}`, updateData)
    return response.data
  } catch (error) {
    console.error("Erro ao atualizar texto:", error)
    throw error
  }
}

export const uploadImage = async (
  formData: FormData,
  idSelected: string,
): Promise<string> => {
  try {
    const response = await axios.post(
      `http://localhost:4000/slides/upload/${idSelected}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )
    return response.data.url // Assumindo que o backend retorna um objeto com a URL da imagem
  } catch (error: any) {
    console.error("Erro ao fazer upload da imagem:", error)
    throw new Error(
      error.response?.data?.message || "Erro ao fazer upload da imagem",
    )
  }
}

export default api
