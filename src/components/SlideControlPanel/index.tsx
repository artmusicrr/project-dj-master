import React, { useEffect, useState } from "react"
import { Form, Input, Select, Button, Tooltip, Card, Row, Col, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { fetchSlidesRequest } from "../../store/slides/actions"
import { Slide } from "../../store/slides/types"
import { updateText, uploadImage } from "../../services/api"
import CustomColorPicker from "../colorPicker"
import ImageSelector from "../selects/ImageSelector"
import TextSelector from "../selects/TextSelector"
import CustomTextArea from "../CustomTextArea"
import { useTheme } from "../../contexts/ThemeContext"
import { fontFamilies, textSelected, imageSelected } from "../../utils/sliderrFormat"
import "./styles.css"

const { Option } = Select

const SlideControlPanel: React.FC = () => {
  const [textAreaValue, setTextAreaValue] = useState("")
  const [idSelected, setidSelected] = useState("")
  const [querySelected, setQuerySelected] = useState("")
  const [color, setColor] = useState<string>("#1677ff")
  const [fontSize, setFontSize] = useState<number>(16)
  const [fontWeight, setFontWeight] = useState<string>("normal")
  const [fontFamily, setFontFamily] = useState<string>("Arial")
  const [newImage, setNewImage] = useState<File | null>(null)
  const [slides, setSlides] = useState<Slide[]>([])
  const dispatch = useDispatch()

  const { slides: slidesRedux, loading } = useSelector(
    (state: RootState) => state.slides
  )

  useEffect(() => {
    dispatch(fetchSlidesRequest())
  }, [dispatch])

  useEffect(() => {
    if (slidesRedux) {
      setSlides(slidesRedux)
    }
  }, [slidesRedux])

  useEffect(() => {
    const firstImageId = Object.keys(imageSelected)[0]
    const firstTextQuery = Object.keys(textSelected)[0]
    if (firstImageId && firstTextQuery) {
      setidSelected(firstImageId)
      setQuerySelected(firstTextQuery)
    }
  }, [])

  useEffect(() => {
    if (idSelected && querySelected && slides) {
      const selectedSlide = slides.find(slide => slide.id.toString() === idSelected)
      if (selectedSlide) {
        switch (querySelected) {
          case "update-title":
            setTextAreaValue(selectedSlide.title || "")
            setColor(selectedSlide.color_title || "#000000")
            setFontSize(selectedSlide.font_size_title || 16)
            setFontWeight(selectedSlide.font_weight_title || "normal")
            setFontFamily(selectedSlide.font_family_title || "Arial")
            break
          case "update-sub-title":
            setTextAreaValue(selectedSlide.sub_title || "")
            setColor(selectedSlide.color_sub_title || "#000000")
            setFontSize(selectedSlide.font_size_sub_title || 16)
            setFontWeight(selectedSlide.font_weight_sub_title || "normal")
            setFontFamily(selectedSlide.font_family_sub_title || "Arial")
            break
          case "update-text":
            setTextAreaValue(selectedSlide.text || "")
            setColor(selectedSlide.color_text || "#000000")
            setFontSize(selectedSlide.font_size_text || 16)
            setFontWeight(selectedSlide.font_weight_text || "normal")
            setFontFamily(selectedSlide.font_family_text || "Arial")
            break
          case "update-any-text":
            setTextAreaValue(selectedSlide.any_text || "")
            setColor(selectedSlide.color_any_text || "#000000")
            setFontSize(selectedSlide.font_size_any_text || 16)
            setFontWeight(selectedSlide.font_weight_any_text || "normal")
            setFontFamily(selectedSlide.font_family_any_text || "Arial")
            break
          default:
            setTextAreaValue("")
            setColor("#000000")
            setFontSize(16)
            setFontWeight("normal")
            setFontFamily("Arial")
            break
        }
      }
    }
  }, [idSelected, querySelected, slides])

  const handleSave = async () => {
    try {
      if (!idSelected || !querySelected) {
        message.error("Por favor, selecione um slide e um campo de texto.")
        return
      }

      let updateData: { [key: string]: any } = {}

      if (newImage) {
        const formData = new FormData()
        formData.append("image", newImage)
        const imageUrl = await uploadImage(formData, idSelected)
        updateData.image_url = imageUrl
        setNewImage(null)
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
      }

      await updateText(querySelected, idSelected, updateData)
      message.success({
        content: "Conteúdo salvo com sucesso!",
        style: {
          marginTop: '20vh',
        },
      })
      dispatch(fetchSlidesRequest())
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
        message.error({
          content: `Falha ao salvar o conteúdo: ${error.message}`,
          style: {
            marginTop: '20vh',
          },
        })
      }
    }
  }

  const { toggleTheme } = useTheme()
  const themeMode = useSelector((state: RootState) => state.theme.mode)

  return (
    <Card 
      title="Painel de Controle dos Slides" 
      className="slide-control-card" 
      variant="outlined"
      style={{
        backgroundColor: 'var(--card-background)',
        color: 'var(--text-color)'
      }}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label={<span style={{ color: 'var(--text-color)' }}>Slide</span>}
            >
              <ImageSelector
                options={imageSelected}
                value={idSelected}
                onChange={(e) => setidSelected(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label={<span style={{ color: 'var(--text-color)' }}>Campo</span>}
            >
              <TextSelector
                options={textSelected}
                value={querySelected}
                onChange={(e) => setQuerySelected(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          label={<span style={{ color: 'var(--text-color)' }}>Digite aqui seu texto</span>}
        >
          <CustomTextArea
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            color={color}
            fontSize={`${fontSize}px`}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item 
              label={<span style={{ color: 'var(--text-color)' }}>Tamanho da Fonte</span>}
            >
              <Input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--input-text)',
                  borderColor: 'var(--input-border)'
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item 
              label={<span style={{ color: 'var(--text-color)' }}>Peso da Fonte</span>}
            >
              <Select 
                value={fontWeight} 
                onChange={(value) => setFontWeight(value)}
                style={{
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--input-text)'
                }}
              >
                <Option value="normal">Normal</Option>
                <Option value="bold">Negrito</Option>
                <Option value="lighter">Mais leve</Option>
                <Option value="bolder">Mais forte</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item 
              label={<span style={{ color: 'var(--text-color)' }}>Família da Fonte</span>}
            >
              <Select 
                value={fontFamily} 
                onChange={(value) => setFontFamily(value)}
                style={{
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--input-text)'
                }}
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label={<span style={{ color: 'var(--text-color)' }}>Imagem de Fundo</span>}
            >
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setNewImage(e.target.files[0])
                  }
                }}
                style={{
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--input-text)',
                  borderColor: 'var(--input-border)'
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label={<span style={{ color: 'var(--text-color)' }}>Cor do Texto</span>}
            >
              <CustomColorPicker
                defaultValue={color}
                onChange={(newColor) => setColor(newColor)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button 
            type="primary" 
            onClick={handleSave}
            style={{
              backgroundColor: 'var(--button-background)',
              color: 'var(--button-text)',
              borderColor: 'var(--border-color)'
            }}
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default SlideControlPanel