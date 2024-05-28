import React, { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import "./styles.css"
import { HeaderProtected } from "../../components/headerProtected/index"
import { updateText } from "../../services/api" // Atualize o caminho conforme necessário

export const Privada = () => {
  const [textAreaValue, setTextAreaValue] = useState("")
  const [idSelected, setidSelected] = useState("")
  const [querySelected, setQuerySelected] = useState("")

  //console.log("ID ==>:", idSelected)

  //const auth = useAuth()

  useEffect(() => {
    // Set valores padrão para idSelected e querySelected com base nas primeiras opções
    const firstImageId = Object.keys(imageSelected)[0]
    const firstTextQuery = Object.keys(textSelected)[0]
    setidSelected(firstImageId)
    setQuerySelected(firstTextQuery)
  }, []) // Executar apenas uma vez na montagem do componente

  const handleEventoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setidSelected(e.target.value)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuerySelected(e.target.value)
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAreaValue(event.target.value)
  }

  const handleSave = async () => {
    try {
      const data = await updateText(querySelected, idSelected, textAreaValue)
      console.log("Success:", data)
      alert("Conteúdo salvo com sucesso!")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
        alert(`Falha ao salvar o conteúdo: ${error.message}`)
      }
    }
  }

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
              ></textarea>

              <div className="select-container">
                <div className="select-label">
                  <label className="texto-image">
                    Selecione em qual slide de imagem da home voce deseja
                    alterar o texto:
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
