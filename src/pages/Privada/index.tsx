import React, { useEffect, useState } from "react"
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
import { Slide } from "../../store/slides/types"
import { Form, Input, Select, Button, Tooltip, Card, Row, Col } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { fetchSlidesRequest } from "../../store/slides/actions"

const { Option } = Select

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
  //const [isLoading, setIsLoading] = useState(true)
  const [slides, setSlides] = useState<Slide[]>([])
  const dispatch = useDispatch()

  //console.log("slides ********==>", slides)

  const { slides: slidesRedux } = useSelector(
    (state: RootState) => state.slides,
  )
  console.log("slidesRedux ==>", slidesRedux)

  useEffect(() => {
    dispatch(fetchSlidesRequest())
  }, [dispatch])

  useEffect(() => {
    if (slidesRedux) {
      setSlides(slidesRedux)
    }
  }, [slidesRedux])

  //console.log("slides ====> ", slides)

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
            setTextAreaValue(
              selectedSlide.sub_title ||
                (slides.length > 0 ? slides[0].sub_title : "") ||
                "",
            )
            setColor(
              selectedSlide.color_sub_title ||
                (slides.length > 0 ? slides[0].color_sub_title : "#000000") ||
                "#000000",
            )
            setFontSize(
              Number(
                selectedSlide.font_size_sub_title ||
                  (slides.length > 0 ? slides[0].font_size_sub_title : 16),
              ) || 16,
            )
            setFontWeight(
              selectedSlide.font_weight_sub_title ||
                (slides.length > 0
                  ? slides[0].font_weight_sub_title
                  : "normal") ||
                "normal",
            )
            setFontFamily(
              selectedSlide.font_family_sub_title ||
                (slides.length > 0
                  ? slides[0].font_family_sub_title
                  : "Arial") ||
                "Arial",
            )
            break
          case "update-text":
            setTextAreaValue(
              selectedSlide.text ||
                (slides.length > 0 ? slides[0].text : "") ||
                "",
            )
            setColor(
              selectedSlide.color_text ||
                (slides.length > 0 ? slides[0].color_text : "#000000") ||
                "#000000",
            )
            setFontSize(
              Number(
                selectedSlide.font_size_text ||
                  (slides.length > 0 ? slides[0].font_size_text : 16),
              ) || 16,
            )
            setFontWeight(
              selectedSlide.font_weight_text ||
                (slides.length > 0 ? slides[0].font_weight_text : "normal") ||
                "normal",
            )
            setFontFamily(
              selectedSlide.font_family_text ||
                (slides.length > 0 ? slides[0].font_family_text : "Arial") ||
                "Arial",
            )
            break

          default:
            setTextAreaValue("")
            setColor("#000000")
            break
        }
      }
    }
  }, [idSelected, querySelected, slideData, slides])

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

  const handleFontWeightChange = (value: string) => {
    setFontWeight(value)
  }

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0])
    }
  }

  const handleSave = async () => {
    //dispatch(fetchSlidesRequest())
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
          const imageUrl = await uploadImage(formData, idSelected)
          updateData.image_url = imageUrl
          setNewImage(null)
        } catch (uploadError: any) {
          console.error("Erro ao fazer upload da imagem:", uploadError.message)
          alert(`Falha ao salvar a imagem: ${uploadError.message}`)
          return
        }
      }

      switch (querySelected) {
        case "update-title":
          updateData = {
            title: textAreaValue,
            color_title: color,
            font_size_title: fontSize,
            font_weight_title: fontWeight,
            font_family_title: fontFamily,
          }
          break
        case "update-sub-title":
          updateData = {
            sub_title: textAreaValue,
            color_sub_title: color,
            font_size_sub_title: fontSize,
            font_weight_sub_title: fontWeight,
            font_family_sub_title: fontFamily,
          }
          break
        case "update-text":
          updateData = {
            text: textAreaValue,
            color_text: color,
            font_size_text: fontSize,
            font_weight_text: fontWeight,
            font_family_text: fontFamily,
          }
          break

        default:
          break
      }

      console.log("Salvando dados:", { querySelected, idSelected, updateData })

      await updateText(querySelected, idSelected, updateData)

      alert("Conteúdo salvo com sucesso!")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
        alert(`Falha ao salvar o conteúdo: ${error.message}`)
      }
    }
    dispatch(fetchSlidesRequest())
  }

  return (
    <div className="container-protected">
      <HeaderProtected />
      <div className="content-protected">
        <div className="body-container">
          <div className="body-left">
            <Card title="Painel de Controle dos Slides">
              <Form layout="vertical">
                <div className="row">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Slide">
                        <ImageSelector
                          options={imageSelected}
                          value={idSelected}
                          onChange={handleEventoChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Campo">
                        <TextSelector
                          options={textSelected}
                          value={querySelected}
                          onChange={handleQueryChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="text-area">
                  <Form.Item label="Digite aqui seu texto">
                    <CustomTextArea
                      value={textAreaValue}
                      onChange={handleTextAreaChange}
                      color={color}
                      fontSize={`${fontSize}px`}
                      fontWeight={fontWeight}
                      fontFamily={fontFamily}
                    />
                  </Form.Item>
                </div>

                <div className="row-font">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label="Tamanho da Fonte">
                        <Input
                          type="number"
                          value={Number(fontSize)}
                          onChange={handleFontSizeChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Peso da Fonte">
                        <Select
                          value={fontWeight}
                          onChange={handleFontWeightChange}
                        >
                          <Option value="normal">Normal</Option>
                          <Option value="bold">Negrito</Option>
                          <Option value="lighter">Mais leve</Option>
                          <Option value="bolder">Mais forte</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Família da Fonte">
                        <Select
                          value={fontFamily}
                          onChange={handleFontFamilyChange}
                        >
                          {fontFamilies.map((font) => (
                            <Option key={font} value={font}>
                              {font}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="row-image-color">
                  <div className="row-image">
                    <Form.Item label="Imagem de Fundo">
                      <Tooltip title="Selecione uma nova imagem para o slide">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Tooltip>
                    </Form.Item>
                  </div>

                  <div className="row-color">
                    <Form.Item label="Cor do Texto">
                      <CustomColorPicker
                        defaultValue={color}
                        onChange={handleColorChange}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="row-button">
                  <Form.Item>
                    <Button type="primary" onClick={handleSave}>
                      Salvar
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Card>
          </div>
          <div className="body-right">
            {/* Painel de Administração (Futuro) */}
            {/* Conteúdo futuro do painel de administração */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privada
