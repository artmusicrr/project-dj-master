import React, { useEffect, useState } from "react"
//import { useAuth } from "../../contexts/AuthProvider/useAuth"
import "./styles.css"
import { HeaderProtected } from "../../components/headerProtected/index"
import { updateText, uploadImage } from "../../services/api"
import CustomColorPicker from "../../components/colorPicker"
import ImageSelector from "../../components/selects/ImageSelector"
import TextSelector from "../../components/selects/TextSelector"
import CustomTextArea from "../../components/CustomTextArea"
import useSlideData from "../../hooks/useSlideData"
import {
  fontFamilies,
  textSelected,
  imageSelected,
} from "../../utils/sliderrFormat"
import { Slide } from "../../types/typesAdm"

export const Privada: React.FC = () => {
  const [textAreaValue, setTextAreaValue] = useState("")
  const [idSelected, setidSelected] = useState("")
  const [querySelected, setQuerySelected] = useState("")
  const [color, setColor] = useState<string>("#1677ff")
  const [fontSize, setFontSize] = useState<number>(16)
  const [fontWeight, setFontWeight] = useState<string>("normal")
  const [fontFamily, setFontFamily] = useState<string>("Arial")
  const slideData = useSlideData()
  const [newImage, setNewImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [slides, setSlides] = useState<Slide[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/slides")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setSlides(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  console.log("slides ====> ", slides)

  useEffect(() => {
    const firstImageId = Object.keys(imageSelected)[0]
    const firstTextQuery = Object.keys(textSelected)[0]
    if (firstImageId && firstTextQuery) {
      setidSelected(firstImageId)
      setQuerySelected(firstTextQuery)
    }
  }, [])

  useEffect(() => {
    if (idSelected && querySelected) {
      const selectedSlide = slideData[idSelected]
      if (selectedSlide) {
        switch (querySelected) {
          case "update-title":
            console.log("selectedSlide.title:", selectedSlide.title)
            setTextAreaValue(
              selectedSlide.title ||
                (slides.length > 0 ? slides[0].title : "") ||
                "",
            )
            setColor(
              selectedSlide.color_title ||
                (slides.length > 0 ? slides[0].color_title : "#000000") ||
                "#000000",
            )
            setFontSize(
              Number(
                selectedSlide.font_size_title ||
                  (slides.length > 0 ? slides[0].font_size_title : 16),
              ) || 16,
            )
            setFontWeight(
              selectedSlide.font_weight_title ||
                (slides.length > 0 ? slides[0].font_weight_title : "normal") ||
                "normal",
            )
            setFontFamily(
              selectedSlide.font_family_title ||
                (slides.length > 0 ? slides[0].font_family_title : "Arial") ||
                "Arial",
            )
            break
          case "update-sub-title":
            setTextAreaValue(selectedSlide.sub_title || "")
            setColor(selectedSlide.color_sub_title || "#000000")
            break
          case "update-text":
            setTextAreaValue(selectedSlide.text || "")
            setColor(selectedSlide.color_text || "#000000")
            break
          case "update-any-text":
            setTextAreaValue(selectedSlide.any_text || "")
            setColor(selectedSlide.color_any_text || "#000000")
            break
          default:
            setTextAreaValue("")
            setColor("#000000")
            break
        }
      }
    }
  }, [idSelected, querySelected, slideData, slides]) // Adicione slides como dependência

  const handleEventoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setidSelected(e.target.value)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuerySelected(e.target.value)
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value)
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value))
  }

  const handleFontWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontWeight(e.target.value)
  }

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0])
    }
  }

  const handleSave = async () => {
    try {
      if (!idSelected || !querySelected) {
        alert("Por favor, selecione um slide e um campo de texto.")
        return
      }

      let updateData: { [key: string]: any } = {}

      if (newImage) {
        const formData = new FormData()
        formData.append("image", newImage)
        try {
          const imageUrl = await uploadImage(formData, idSelected) // Chame a função de uploadImage
          updateData.image_url = imageUrl // Adicione a URL da imagem aos dados de atualização
          setNewImage(null) // Limpe o estado da imagem após o upload
        } catch (uploadError: any) {
          console.error("Erro ao fazer upload da imagem:", uploadError.message)
          alert(`Falha ao salvar a imagem: ${uploadError.message}`)
          return // Não continue se o upload da imagem falhar
        }
      }

      switch (querySelected) {
        case "update-title":
          updateData = {
            title: textAreaValue,
            color_title: color,
            font_size_title: fontSize, // Adicione aqui
            font_weight_title: fontWeight, // Adicione aqui
            font_family_title: fontFamily,
          }
          break
        case "update-sub-title":
          updateData = { sub_title: textAreaValue, color_sub_title: color }
          break
        case "update-text":
          updateData = { text: textAreaValue, color_text: color }
          break
        case "update-any-text":
          updateData = { any_text: textAreaValue, color_any_text: color }
          break
        default:
          break
      }

      console.log("Salvando dados:", { querySelected, idSelected, updateData })

      // Envia os dados separadamente para a API
      await updateText(querySelected, idSelected, updateData)

      alert("Conteúdo salvo com sucesso!")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
        alert(`Falha ao salvar o conteúdo: ${error.message}`)
      }
    }
  }

  return (
    <div className="container">
      <div className="content">
        <HeaderProtected />
        <div className="body-container">
          <div className="body-left">
            {" "}
            {/* Painel de Controle dos Slides */}
            <div className="textarea-container">
              <CustomTextArea
                value={textAreaValue}
                onChange={handleTextAreaChange}
                color={color}
                fontSize={`${fontSize}px`}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
              />

              <div className="select-container">
                <ImageSelector
                  options={imageSelected}
                  value={idSelected}
                  onChange={handleEventoChange}
                />
                <TextSelector
                  options={textSelected}
                  value={querySelected}
                  onChange={handleQueryChange}
                />
              </div>

              {/* Campos para font_size, font_weight e font_family */}
              <div>
                <label>Tamanho da Fonte:</label>
                <input
                  type="number"
                  value={Number(fontSize)}
                  onChange={handleFontSizeChange}
                />
              </div>

              <div>
                <label>Peso da Fonte:</label>
                <select value={fontWeight} onChange={handleFontWeightChange}>
                  <option value="normal">Normal</option>
                  <option value="bold">Negrito</option>
                  <option value="lighter">Mais leve</option>
                  <option value="bolder">Mais forte</option>
                  {/* Adicione mais opções conforme necessário */}
                </select>
              </div>

              <div>
                <label>Família da Fonte:</label>
                <select value={fontFamily} onChange={handleFontFamilyChange}>
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <button onClick={handleSave}>Salvar</button>

              <div>
                <label htmlFor="">SELECIONE A COR DO TEXTO</label>
                <CustomColorPicker
                  defaultValue={color}
                  onChange={handleColorChange}
                  fontSize={"16"} // Add the required fontSize property
                />
              </div>
            </div>
          </div>
          <div className="body-right">
            {" "}
            {/* Painel de Administração (Futuro) */}
            {/* Conteúdo futuro do painel de administração */}
          </div>
        </div>
      </div>
    </div>
  )
}
