import React from "react"
import { ColorPicker } from "antd"
import type { Color } from "antd/es/color-picker"

interface CustomColorPickerProps {
  defaultValue?: string
  onChange?: (color: string) => void
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
  defaultValue = "#1677ff",
  onChange,
}) => {
  const handleColorChange = (_: Color, hexString: string) => {
    if (onChange) {
      onChange(hexString)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <ColorPicker
        defaultValue={defaultValue}
        onChange={handleColorChange}
        style={{
          backgroundColor: 'var(--input-background)',
          borderColor: 'var(--input-border)'
        }}
      />
      <span style={{ color: 'var(--text-color)' }}>
        Cor selecionada: {defaultValue}
      </span>
    </div>
  )
}

export default CustomColorPicker
