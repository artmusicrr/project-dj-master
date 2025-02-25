import React from "react"

interface TextSelectorProps {
  options: { [key: string]: string }
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const TextSelector: React.FC<TextSelectorProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="select-label">
      <label className="texto-image">
        Selecione qual é o campo de texto que deseja alterar:
      </label>
      <select
        className="select"
        name="textEvent"
        id="textEvent"
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

export default TextSelector
