import React from "react"
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import './index.css';
import './styles/theme.css';
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { AuthProvider } from "./contexts/AuthProvider"
import { ThemeContextProvider } from "./contexts/ThemeContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Provider store={store}>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)

reportWebVitals()
