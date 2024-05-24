import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons"
import React, { useState } from "react"
import "./styles.css"

const Section: React.FC = () => {
  const [activeContentIndex, setActiveContentIndex] = useState(0)

  const imgUrls = [
    "/assets/img/100.jpg",
    "/assets/img/101.webp",
    "/assets/img/102.jpg",
    "/assets/img/103.jpg",
    "/assets/img/104.jpg",
  ]

  // Conteúdos correspondentes a cada slide
  const contentText = [
    {
      title: "Dj Master.",
      span: "",
      text: (
        <p>
          Apresentamos DJ Master: O DJ e VDJ com mais de 30 anos de experiência
          <br />
          Com um legado de mais de três décadas na cena dos eventos, Ronaldo
          Master é uma referência em animação e entretenimento. <br />
          Especializado em uma variedade de ocasiões, desde casamentos e
          aniversários até grandes confraternizações corporativas, Ronaldo tem a
          expertise e o talento necessários para tornar qualquer evento
          memorável e cheio de energia.
        </p>
      ),
    },
    {
      title: "Experiência que Fala por Si.",
      span: "",
      text: (
        <p>
          Com mais de 30 anos dedicados à arte de animar festas, DJ Master
          acumulou uma rica bagagem de experiências. <br />
          Sua jornada começou há décadas, e desde então ele tem sido o maestro
          por trás de inúmeros momentos inesquecíveis. <br />
          Sua paixão pela música e pelos vídeos o levou a aprimorar suas
          habilidades, garantindo que cada evento seja único e personalizado de
          acordo com as preferências dos clientes.
        </p>
      ),
    },
    {
      title: " Repertório Inigualável.",
      span: "",
      text: (
        <p>
          Uma das características distintivas de DJ Master é o seu extenso
          repertório musical e de clipes de vídeo. <br />
          Desde os clássicos atemporais até as batidas mais modernas, ele possui
          uma biblioteca abrangente que agrada a todos os gostos e idades.{" "}
          <br />
          Além disso, como VDJ, Ronaldo combina música e vídeo de maneira fluida
          e criativa, elevando a experiência do público a um novo nível de
          imersão e diversão.
        </p>
      ),
    },
    {
      title: "Eventos para Todas as Ocasiões. ",
      span: "",
      text: (
        <p>
          Seja qual for a ocasião, Ronaldo Master está pronto para transformá-la
          em uma celebração inesquecível. <br />
          De casamentos românticos a festas de aniversário cheias de energia,
          ele adapta sua performance para atender às necessidades específicas de
          cada evento. <br />
          Sua experiência e profissionalismo garantem que tudo transcorra sem
          problemas, deixando os clientes livres para aproveitar ao máximo o
          momento especial.
        </p>
      ),
    },
    {
      title: "Transforme seu Evento com Dj Master",
      span: "",
      text: (
        <p>
          Seja qual for a ocasião, Ronaldo Master está pronto para transformá-la
          em uma celebração inesquecível. <br />
          De casamentos românticos a festas de aniversário cheias de energia,
          ele adapta sua performance para atender às necessidades específicas de
          cada evento. <br />
          Sua experiência e profissionalismo garantem que tudo transcorra sem
          problemas, deixando os clientes livres para aproveitar ao máximo o
          momento especial.
        </p>
      ),
    },
  ]

  // Função para lidar com o clique no botão de navegação
  const handleNavClick = (index: number) => {
    setActiveContentIndex(index)
    window.scrollTo(0, 0);
  }

  console.log("===> ", activeContentIndex)

  return (
    <section className="home">
      {imgUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          className={`video-slide ${index === activeContentIndex ? "active" : ""
            }`}
        />
      ))}

      {contentText.map((content_text, index) => (
        <div
          key={index}
          className={`content ${index === activeContentIndex ? "active" : ""}`}
        >
          <h1>{content_text.title}</h1>
          <span>{content_text.span}</span>
          <p>{content_text.text}</p>
          <a href="#"> Read More</a>
        </div>
      ))}

      <div className="media-icons">
        <a
          href="https://www.facebook.com/djmasterbrasil"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://www.instagram.com/djronaldomaster/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAAXcrsUBYqYEaYTSaG53odmOIQ9mzow1Eg0&keywords=dj%20master&origin=RICH_QUERY_SUGGESTION&position=0&searchId=05598384-64df-4b10-af17-80a3a70322ee&sid=U9n&spellCorrectionEnabled=false"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>

        <a
          href="https://wa.me/5511972965062"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
      <div className="slider-navigation">
        {/* Renderiza os botões de navegação */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`nav-btn ${index === activeContentIndex ? "active" : ""
              }`}
            onClick={() => handleNavClick(index)}
          ></div>
        ))}
      </div>
    </section>
  )
}

export default Section
