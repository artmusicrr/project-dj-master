import React, { useState } from "react"
import { SketchPicker, ColorResult } from "react-color"
import { DownOutlined } from "@ant-design/icons"
import { Space, Popover } from "antd"
import { ICustonTitle } from "../../types/typesCustnTitle"

// /**
//  * @param defaultValue - The default color value.
//  * @param showText - A function that returns the JSX for displaying text related to the color.
//  */

const CustomColorPicker: React.FC<ICustonTitle> = ({
  defaultValue,
  showText,
  onChange,
}) => {
  const [color, setColor] = useState(defaultValue || "#1677ff")
  const [open, setOpen] = useState(false)
  //console.log("color ==>", color)

  const handleChangeComplete = (color: ColorResult) => {
    const selectedColor = color.hex
    setColor(selectedColor)
    if (onChange) {
      onChange(selectedColor)
    }
  }

  return (
    <Popover
      content={
        <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      }
      trigger="click"
      visible={open}
      onVisibleChange={setOpen}
    >
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <div
          style={{
            width: "36px",
            height: "14px",
            borderRadius: "2px",
            backgroundColor: color,
            marginRight: "8px",
          }}
        />
        {typeof showText === "function" ? (
          showText(color)
        ) : (
          <span>{color}</span>
        )}
        <DownOutlined
          rotate={open ? 180 : 0}
          style={{
            color: "rgba(0, 0, 0, 0.25)",
            marginLeft: "8px",
          }}
        />
      </div>
    </Popover>
  )
}

export default CustomColorPicker
