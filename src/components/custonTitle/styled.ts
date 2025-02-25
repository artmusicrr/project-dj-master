import styled from "styled-components"

interface TitleProps {
  color?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
}

export const Title = styled.h1<TitleProps>`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.5em")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : "Arial")};
`
