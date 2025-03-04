import React from "react"
import { Select } from "antd"
import "./styles.css"

interface ImageSelectorProps {
  options: { [key: string]: string }
  value: string
  onChange: (e: { target: { value: string } }) => void
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ options, value, onChange }) => {
  return (
    <Select
      className="image-selector"
      value={value}
      onChange={(newValue) => onChange({ target: { value: newValue } })}
      style={{
        width: "100%",
        backgroundColor: "var(--input-background)",
        color: "var(--input-text)"
      }}
    >
      {Object.entries(options).map(([key, label]) => (
        <Select.Option 
          key={key} 
          value={key}
          style={{
            backgroundColor: "var(--input-background)",
            color: "var(--input-text)"
          }}
        >
          {label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default ImageSelector
