import React from "react"
import Header from "../../components/header"
import Section from "../../components/section"
// import Gallery from "../Gallery"
import * as Styled from "./styles"

export const Home = () => {
  return (
    <Styled.Container>
      <Header />
      <Section slides={[]} fontSize={16} color="black" />
    </Styled.Container>
  )
}

export default Home
