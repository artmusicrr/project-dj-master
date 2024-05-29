import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons"
import React, { useEffect, useState } from "react"
import "./styles.css"

const Section: React.FC = () => {
  const [activeContentIndex, setActiveContentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [contents, setContents] = useState([
    { id_text: 1, title: "", subTitle: "", text: "", anyText: "" },
    { id_text: 2, title: "", subTitle: "", text: "", anyText: "" },
    { id_text: 3, title: "", subTitle: "", text: "", anyText: "" },
    { id_text: 4, title: "", subTitle: "", text: "", anyText: "" },
    { id_text: 5, title: "", subTitle: "", text: "", anyText: "" },
  ])

  const imgUrls = [
    "/assets/img/100.jpg",
    "/assets/img/101.webp",
    "/assets/img/102.jpg",
    "/assets/img/103.jpg",
    "/assets/img/104.jpg",
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://master-back-deploy.onrender.com/title",
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log("Data = SECTION ==>:", data)
        const updatesContents = contents.map((content) => {
          const item = data.find(
            (item: { id_text: number }) => item.id_text === content.id_text,
          )
          return item ? { ...content, ...item } : content
        })
        setContents(updatesContents)
        setIsLoading(false) // Set loading to false after data is loaded
      } catch (error) {
        console.error("Error:", error)
        setIsLoading(false) // Set loading to false even if there is an error
      }
    }

    fetchData()
  }, []) // Empty dependency array to run only once when the component mounts

  if (isLoading) {
    return <div>Loading...</div> // Or any loading indicator
  }

  const contentText = contents.map((content) => ({
    title: content.title,
    span: content.subTitle,
    text: <p>{content.text}</p>,
  }))
  console.log("===> ", contentText)

  const handleNavClick = (index: number) => {
    setActiveContentIndex(index)
    window.scrollTo(0, 0)
  }

  console.log("===> ", activeContentIndex)

  return (
    <section className="home">
      {imgUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          className={`video-slide ${
            index === activeContentIndex ? "active" : ""
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
          <span className="line">{content_text.text}</span>
          {/* <a href="#"> Read More</a> */}
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
            className={`nav-btn ${
              index === activeContentIndex ? "active" : ""
            }`}
            onClick={() => handleNavClick(index)}
          ></div>
        ))}
      </div>
    </section>
  )
}

export default Section
