import React, { useState, forwardRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { submitContactRequest, resetContactState } from "../../store/contact/actions"
import { RootState } from "../../store"
import "./styles.css"

const Form = forwardRef<HTMLDivElement>((props, ref) => {
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state: RootState) => state.contact)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    event_location: "",
    event_date: "",
    event_type: "casamento", // default value
    message: ""
  })

  useEffect(() => {
    // Limpa o estado quando o componente é desmontado
    return () => {
      dispatch(resetContactState())
    }
  }, [dispatch])

  const eventos = {
    casamento: "Casamento",
    aniversario: "Aniversário",
    debutantes: "Debutantes",
    bodas: "Bodas",
    confraternizacao: "Confraternização",
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(submitContactRequest(formData))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="container-form" ref={ref}>
      {!success ? (
        <>
          <h1>Formulário de contato</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="container-inputs">
              <div className="container-left">
                <div className="label-float">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" " 
                    required 
                  />
                  <label>Nome</label>
                </div>

                <div className="label-float">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" " 
                    required 
                  />
                  <label>E-mail</label>
                </div>

                <div className="label-float">
                  <input 
                    type="text" 
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder=" " 
                    required 
                  />
                  <label>Telefone</label>
                </div>

                <div className="label-float">
                  <input 
                    type="text" 
                    name="event_location"
                    value={formData.event_location}
                    onChange={handleInputChange}
                    placeholder=" " 
                    required 
                  />
                  <label>Local do Evento</label>
                </div>
                <div className="date-select">
                  <div className="label-date">
                    <label>Data do evento</label>
                    <input 
                      type="date" 
                      name="event_date"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      placeholder=" " 
                      required 
                    />
                  </div>

                  <div className="select-container">
                    <label htmlFor="type">Tipo de Evento:</label>
                    <select
                      className="select"
                      name="event_type"
                      id="evento"
                      value={formData.event_type}
                      onChange={handleInputChange}
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
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Mensagem"
                  required
                ></textarea>
              </div>
              <div className="container-button">
                <button type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
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
