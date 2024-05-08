import React from "react"
import * as Styled from "./styles"
import { Carousel } from "antd"
import Header from "../../components/header"
import Section from "../../components/section"
import Form from "../../components/form"

export const Home = () => {
  return (
    <Styled.Container>
      <Header />
      <Section />
    </Styled.Container>
  )
}

export default Home
