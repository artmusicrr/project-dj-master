import React from "react"

interface ImageSelectorProps {
  options: { [key: string]: string }
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="select-label">
      <label className="texto-image">
        Selecione em qual slide de imagem da home você deseja alterar o texto:
      </label>
      <select
        className="select"
        name="eventoid"
        id="eventoid"
        value={value}
        onChange={onChange}
      >
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ImageSelector
