import React, { useState, forwardRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { submitContactRequest, resetContactState } from "../../store/contact/actions"
import { RootState } from "../../store"
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  useTheme,
  Slide,
  SelectChangeEvent
} from "@mui/material"
import { styled } from "@mui/material/styles"
import "./styles.css"

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'var(--card-background)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTextField-root, & .MuiFormControl-root': {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'var(--input-background)',
      color: 'var(--input-text)',
      '& fieldset': {
        borderColor: 'var(--input-border)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--primary-color)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary-color)',
      },
      '& input': {
        color: 'var(--input-text) !important',
      },
      '& textarea': {
        color: 'var(--input-text) !important',
      },
      '&.Mui-focused': {
        backgroundColor: 'var(--input-background)',
      }
    },
    '& .MuiInputLabel-root': {
      color: 'var(--text-color)',
      '&.Mui-focused': {
        color: 'var(--primary-color)',
      },
    },
  },
  '& .MuiSelect-select': {
    color: 'var(--input-text) !important',
    '&:focus': {
      backgroundColor: 'transparent !important',
    }
  },
  '& .MuiSelect-icon': {
    color: 'var(--text-color)',
  },
  '& .MuiSelect-root': {
    backgroundColor: 'var(--input-background)',
    '&:hover': {
      backgroundColor: 'var(--input-background)',
    }
  },
  '& .MuiList-root': {
    backgroundColor: 'var(--card-background)',
  },
  '& .MuiMenuItem-root': {
    color: 'var(--text-color)',
    '&.Mui-selected': {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--button-text)',
      '&:hover': {
        backgroundColor: 'var(--primary-color)',
      },
    },
    '&:hover': {
      backgroundColor: 'var(--background-color)',
    },
  },
  '& .MuiPopover-paper': {
    marginTop: '8px',
    backgroundColor: 'var(--card-background)',
  },
}));

const Form = forwardRef<HTMLDivElement>((props, ref) => {
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state: RootState) => state.contact)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    event_location: "",
    event_date: "",
    event_type: "casamento",
    message: ""
  })

  useEffect(() => {
    return () => {
      dispatch(resetContactState())
    }
  }, [dispatch])

  const eventos = {
    casamento: "Casamento",
    aniversario: "Aniversário",
    debutantes: "Debutantes",
    bodas: "Bodas",
    corporativo: "Corporativo",
    formatura: "Formatura",
    confraternizacao: "Confraternização",
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(submitContactRequest(formData))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      event_type: value
    }));
  };

  if (success) {
    return (
      <Slide direction="up" in={true}>
        <Box 
          ref={ref}
          className="container-form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px'
          }}
        >
          <Alert 
            severity="success" 
            sx={{ 
              width: '100%',
              maxWidth: '400px',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Mensagem enviada com sucesso!
            </Typography>
            <Typography>
              Entraremos em contato em breve.
            </Typography>
          </Alert>
        </Box>
      </Slide>
    )
  }

  return (
    <Box 
      ref={ref} 
      className="container-form" 
      onClick={(e) => e.stopPropagation()} // Previne a propagação do clique no container do formulário
    >
      <StyledPaper elevation={0}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{
            color: 'var(--primary-color)',
            py: 3,
            fontWeight: 600,
          }}
        >
          Formulário de contato
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 3,
          }}
        >
          <Grid container spacing={3}>
            {/* Coluna Esquerda */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Telefone"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Box>
            </Grid>

            {/* Coluna Direita */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Local do Evento"
                  name="event_location"
                  value={formData.event_location}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Data do Evento"
                  name="event_date"
                  type="date"
                  value={formData.event_date}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="event-type-label">Tipo de Evento</InputLabel>
                  <Select
                    labelId="event-type-label"
                    id="event-type-select"
                    value={formData.event_type}
                    onChange={handleSelectChange}
                    label="Tipo de Evento"
                    name="event_type"
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      sx: {
                        '& .MuiPaper-root': {
                          borderRadius: 2,
                          marginTop: 1,
                          minWidth: 120,
                          backgroundColor: 'var(--card-background)',
                          color: 'var(--input-text)',
                          '& .MuiMenuItem-root': {
                            padding: '8px 16px',
                            '&:hover': {
                              backgroundColor: 'var(--background-color)',
                            },
                            '&.Mui-selected': {
                              backgroundColor: 'var(--primary-color)',
                              color: 'var(--button-text)',
                              '&:hover': {
                                backgroundColor: 'var(--primary-color-hover)',
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    {Object.entries(eventos).map(([key, value]) => (
                      <MenuItem 
                        key={key} 
                        value={key}
                      >
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            {/* Área da Mensagem (Largura Total) */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensagem"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              mt: 2,
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
              borderRadius: 2,
              backgroundColor: 'var(--primary-color)',
              '&:hover': {
                backgroundColor: 'var(--primary-color-hover)',
              },
            }}
          >
            {loading ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </Box>
      </StyledPaper>
    </Box>
  )
})

Form.displayName = "Form"
export default Form
