import React, { useState, forwardRef } from "react"
import "./styles.css"
import { InputText } from "primereact/inputtext"
import { FloatLabel } from "primereact/floatlabel"

const Form = forwardRef<HTMLDivElement>((props, ref) => {
  const [eventoSelecionado, setEventoSelecionado] = useState("")
  const [enviado, setEnviado] = useState(false)

  const eventos = {
    casamento: "Casamento",
    aniversario: "Aniversário",
    debutantes: "Debutantes",
    bodas: "Bodas",
    confraternizacao: "Confraternização",
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Lógica para enviar o formulário
    // Aqui você pode adicionar sua lógica de envio do formulário, como chamadas de API, etc.
    // Após o envio bem-sucedido, você pode definir o estado 'enviado' como true
    setTimeout(() => {
      setEnviado(true)
    }, 1000)
  }

  const handleEventoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventoSelecionado(e.target.value)
  }

  return (
    <div className="container-form" ref={ref}>
      {!enviado ? (
        <>
          <h1>Formulário de contato</h1>
          <form
            onSubmit={handleSubmit}
            action="https://formsubmit.co/artmusicrod@gmail.com"
            method="POST"
            className="form-container"
          >
            <div className="container-inputs">
              <div className="container-left">
                <div className="label-float">
                  <input type="text" placeholder=" " required />
                  <label>Nome</label>
                </div>

                <div className="label-float">
                  <input type="email" placeholder=" " required />
                  <label>E-mail</label>
                </div>

                <div className="label-float">
                  <input type="text" placeholder=" " required />
                  <label>Telefone</label>
                </div>

                <div className="label-float">
                  <input type="text" placeholder=" " required />
                  <label>Local do Evento</label>
                </div>
                <div className="date-select">
                  <div className="label-date">
                    <label>Data do evento</label>
                    <input type="date" placeholder=" " required />
                  </div>

                  <div className="select-container">
                    <label htmlFor="type">Tipo de Evento:</label>
                    <select
                      className="select"
                      name="evento"
                      id="evento"
                      value={eventoSelecionado}
                      onChange={handleEventoChange}
                    >
                      {Object.entries(eventos).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-footer">
              <div className="container-message">
                <label htmlFor="message">Mensagem:</label>
                <textarea
                  name="message"
                  placeholder="Mensagem"
                  required
                ></textarea>
              </div>
              <div className="container-button">
                <button type="submit">Enviar</button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="mensagem-enviada">
          <p>O formulário foi enviado com sucesso!</p>
        </div>
      )}
    </div>
  )
})

Form.displayName = "Form"
export default Form
