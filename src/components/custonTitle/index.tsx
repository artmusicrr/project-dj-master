import React from "react"
import { ICustonTitle } from "../../types/typesCustnTitle"
import { Title } from "./styled"
import CustomColorPicker from "./../colorPicker/index"

const CustomTitle: React.FC<ICustonTitle> = ({
  color,
  fontSize,
  fontWeight,
  fontFamily,
  children,
}) => {
  return (
    <>
      <Title
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
      >
        {children}
      </Title>
    </>
  )
}

export default CustomTitle
