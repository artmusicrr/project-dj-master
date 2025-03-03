import React, { useEffect, useRef } from "react"
import "./styles.css"

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
  color = "#000000",
  fontSize = "16px",
  fontWeight = "normal",
  fontFamily = "Arial",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = value
    }
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder="Digite seu texto aqui..."
      className="custom-textarea"
      style={{
        color,
        fontSize,
        fontWeight,
        fontFamily,
        width: "100%",
        minHeight: "150px",
        padding: "12px",
        border: "1px solid #d9d9d9",
        borderRadius: "4px",
        resize: "vertical",
        backgroundColor: "#ffffff",
      }}
    />
  )
}

export default CustomTextArea
