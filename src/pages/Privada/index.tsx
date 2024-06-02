import React, { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import "./styles.css"
import { HeaderProtected } from "../../components/headerProtected/index"
import { updateText } from "../../services/api.text" // Atualize o caminho conforme necessário
import { updateColorText } from "../../services/api.colorText"

import CustomColorPicker from "../../components/colorPicker"
import { ICustonTitle } from "../../types/typesCustnTitle"

export const Privada: React.FC<ICustonTitle> = () => {
  const [textAreaValue, setTextAreaValue] = useState("")
  const [idSelected, setidSelected] = useState("")
  const [querySelected, setQuerySelected] = useState("")
  const [colorColumnSelected, setColorColumnSelected] = useState("")
  const [color, setColor] = useState<string>("#1677ff")

  //console.log("color ==>", color)

  const auth = useAuth()

  useEffect(() => {
    // Set valores padrão para idSelected e querySelected com base nas primeiras opções
    const firstImageId = Object.keys(imageSelected)[0]
    const firstTextQuery = Object.keys(textSelected)[0]
    const firstColorQuery = Object.keys(colorSelected)[0]
    setidSelected(firstImageId)
    setQuerySelected(firstTextQuery)
    setColorColumnSelected(firstColorQuery)
  }, []) // Executar apenas uma vez na montagem do componente

  const handleEventoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setidSelected(e.target.value)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuerySelected(e.target.value)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColorColumnSelected(e.target.value)
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAreaValue(event.target.value)
  }
  //console.log(">>>>>>>>>", color)
  const handleSave = async () => {
    try {
      console.log("Calling handleSave with:", {
        querySelected,
        idSelected,
        textAreaValue,
        color,
      })
      let updateData = {}

      switch (querySelected) {
        case "update-title":
          updateData = { title: textAreaValue, color_title: color }
          break
        case "update-sub-title":
          updateData = { sub_title: textAreaValue, color_title: color }
          break
        case "update-text":
          updateData = { text: textAreaValue, color_title: color }
          break
        case "update-any-text":
          updateData = { any_text: textAreaValue, color_title: color }
          break

        default:
          break
      }

      console.log("Data to update:", updateData)
      console.log("Salvando dados:", { querySelected })

      const data = await updateText(
        querySelected,
        idSelected,
        textAreaValue,
        color,
      )
      console.log("data xxxxxxxxxxxxxxxx==>", data)
      alert("Conteúdo salvo com sucesso!")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
        alert(`Falha ao salvar o conteúdo: ${error.message}`)
      }
    }
  }

  const handleSaveColor = async () => {
    try {
      console.log("Calling handleSaveColor with:", {
        colorColumnSelected,
        idSelected,
        color,
      })
      let updateDataColor = {}

      switch (colorColumnSelected) {
        case "color_title":
          updateDataColor = { color_title: color }
          break
        case "color_sub_title":
          updateDataColor = { color_sub_title: color }
          break
        case "color_text":
          updateDataColor = { color_text: color }
          break
        case "color_any_text":
          updateDataColor = { color_any_text: color }
          break
        default:
          break
      }
      console.log("Data to update color:", updateDataColor)
      console.log("Salvando dados:", {
        colorColumnSelected,
        idSelected,
        updateDataColor,
      })

      const data = await updateColorText(colorColumnSelected, idSelected, color)
      alert("Conteúdo salvo com sucesso!")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
        alert(`Falha ao salvar o conteúdo: ${error.message}`)
      }
    }
  }

  console.log("Calling handleSave with:", {
    querySelected,
    idSelected,
    textAreaValue,
    color,
  })
  console.log("Calling handleSaveColor with:", {
    colorColumnSelected,
    idSelected,
    color,
  })

  const imageSelected = {
    1: "Texto do slide 1",
    2: "Texto do slide 2",
    3: "Texto do slide 3",
    4: "Texto do slide 4",
    5: "Texto do slide 5",
  }

  const textSelected = {
    "update-title": "Titulo",
    "update-sub-title": "Sub-titulo",
    "update-text": "Texto",
    "update-any-text": "Outros textos",
  }

  const colorSelected = {
    color_title: "Titulo",
    color_sub_title: "Sub-titulo",
    color_text: "Texto",
    color_any_text: "Outros textos",
  }

  return (
    <div className="container">
      <div className="content">
        <HeaderProtected />
        <div className="body-container">
          <div className="body-left">
            <div className="textarea-container">
              <textarea
                value={textAreaValue}
                onChange={handleTextAreaChange}
                placeholder="Digite seu texto aqui..."
                style={{ color: color }}
              ></textarea>

              <div className="select-container">
                <div className="select-label">
                  <label className="texto-image">
                    Selecione em qual slide de imagem da home voce deseja
                    alterar o texto ou a cor:
                  </label>
                  <select
                    className="select"
                    name="eventoid"
                    id="eventoid"
                    value={idSelected}
                    onChange={handleEventoChange}
                  >
                    {Object.entries(imageSelected).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-label">
                  <label className="texto-image">
                    Selecione qual é o campo de texto que deseja alterar:
                  </label>
                  <select
                    className="select"
                    name="textEvent"
                    id="textEvent"
                    value={querySelected}
                    onChange={handleQueryChange}
                  >
                    {Object.entries(textSelected).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={handleSave}>Salvar</button>
              <div className="select-label">
                <label className="texto-image">
                  Selecione qual é o campo de texto que deseja alterar a cor:
                </label>
                <select
                  className="select"
                  name="colorEvent"
                  id="colorEvent"
                  value={colorColumnSelected}
                  onChange={handleColorChange}
                >
                  {Object.entries(colorSelected).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleSaveColor}>Alterar Cor</button>
              {/* ///////////////////////////////////////////// */}
              <div>
                <label htmlFor="">SELECIONE A COR DO TEXTO</label>
                <CustomColorPicker
                  defaultValue="#1677ff"
                  showText={(color) => <span>Custom Text ({color})</span>}
                  onChange={(newColor) => setColor(newColor)}
                />
              </div>
              {/* /////////////////////////////////////////////// */}
            </div>
          </div>
          <div className="body-right"></div>
        </div>

        <div className="footer">Footer</div>
      </div>
    </div>
  )
}

export default Privada
