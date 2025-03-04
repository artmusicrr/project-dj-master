import React, { TextareaHTMLAttributes } from "react"
import "./styles.css"

interface CustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  color?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  color,
  fontSize,
  fontWeight,
  fontFamily,
  ...props
}) => {
  return (
    <textarea
      className="custom-textarea"
      style={{
        color: color || 'var(--input-text)',
        fontSize,
        fontWeight,
        fontFamily,
        backgroundColor: 'var(--input-background)',
        borderColor: 'var(--input-border)'
      }}
      {...props}
    />
  )
}

export default CustomTextArea
