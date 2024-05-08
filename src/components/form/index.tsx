import React, { useState, forwardRef } from "react"
import "./styles.css"

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
      <h1>Formulário de contato</h1>
      {!enviado ? (
        <form
          onSubmit={handleSubmit}
          action="https://formsubmit.co/artmusicrod@gmail.com"
          method="POST"
          className="form-container"
        >
          <div className="container-inputs">
            <div className="container-left">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                name="name"
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Digite seu email"
                name="email"
                required
              />

              <label htmlFor="phone">Telefone:</label>
              <input
                type="text"
                placeholder="Digite seu telefone"
                name="phone"
              />
            </div>
            <div className="container-right">
              <label htmlFor="date">Data do Evento:</label>
              <input
                type="date"
                placeholder="Digite a data do evento"
                name="date"
                required
              />

              <label htmlFor="local">Local do Evento:</label>
              <input type="text" placeholder="Local do evento" name="local" />

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
          <div className="container-footer">
            <div className="container-message">
              <label htmlFor="message">Mensagem:</label>
              <textarea
                name="message"
                placeholder="Mensagem"
                required
              ></textarea>
            </div>
            <button type="submit">Enviar</button>
          </div>
        </form>
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
