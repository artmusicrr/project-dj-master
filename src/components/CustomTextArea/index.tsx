import React from "react"

interface CustomTextAreaProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  color?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  value,
  onChange,
  color,
  fontSize,
  fontWeight,
  fontFamily,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="Digite seu texto aqui..."
      style={{
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontFamily: fontFamily,
      }}
    />
  )
}

export default CustomTextArea
