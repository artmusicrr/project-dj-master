import React from "react"
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { AuthProvider } from "./contexts/AuthProvider"
//import "antd/dist/antd.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)

reportWebVitals()
