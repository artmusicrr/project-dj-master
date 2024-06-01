import React from "react"
import { ICustonTitle } from "../../types/typesCustnTitle"
import { Title } from "./styled"
import CustomColorPicker from "./../colorPicker/index"

const CustomTitle: React.FC<ICustonTitle> = ({ color, children }) => {
  return (
    <>
      <Title style={{ color: color }}>{children}</Title>
    </>
  )
}

export default CustomTitle
