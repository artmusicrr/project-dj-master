import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons"
import React, { useEffect, useState, useRef } from "react"
import "./styles.css"
import CustomTitle from "../custonTitle"
import { Slide } from "../../store/slides/types"
import { ICustonTitle } from "../../types/typesAdm"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { fetchSlidesRequest } from "../../store/slides/actions"

const Section: React.FC<ICustonTitle> = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeContentIndex, setActiveContentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [slides, setSlides] = useState<Slide[]>([])
  const dispatch = useDispatch()

  const slidesRedux = useSelector((state: RootState) => state.slides.slides) // Ajuste aqui

  useEffect(() => {
    dispatch(fetchSlidesRequest())
  }, [dispatch])

  useEffect(() => {
    if (slidesRedux) {
      setSlides(slidesRedux.slides)

      setIsLoading(false)

    }
  }, [slidesRedux])

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setActiveContentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      )
    }, 1000000)

    return () => clearInterval(intervalId)
  }, [slides.length])

  useEffect(() => {
    if (sectionRef.current && slides[activeContentIndex]) {
      sectionRef.current.style.setProperty(
        "--title-font-size",
        slides[activeContentIndex].font_size_title?.toString() + "px",
      )
      sectionRef.current.style.setProperty(
        "--title-font-weight",
        slides[activeContentIndex].font_weight_title?.toString() || "",
      )
      sectionRef.current.style.setProperty(
        "--title-font-family",
        slides[activeContentIndex].font_family_title || "",
      )
    }
  }, [activeContentIndex, slides])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className="home" ref={sectionRef}>
      {slides.map((slide, index) => (
        <React.Fragment key={slide.id}>
          <img
            src={`http://localhost:4000${slide.image_url}`}
            alt={`Slide ${slide.id}`}
            className={`video-slide ${index === activeContentIndex ? "active" : ""
              }`}
          />
          <div
            className={`content ${index === activeContentIndex ? "active" : ""}`}
          >
            <CustomTitle
              color={slide.color_title}
              fontSize={slide.font_size_title?.toString()}
              fontWeight={slide.font_weight_title}
              fontFamily={slide.font_family_title}
            >
              {slide.title}
            </CustomTitle>
            <span
              style={{
                color: slide.color_sub_title,
                fontSize: slide.font_size_sub_title,
              }}
            >
              {slide.sub_title}
            </span>
            <span
              className="line"
              style={{
                color: slide.color_text,
                fontSize: slide.font_size_text,
              }}
            >
              {slide.text}
            </span>
          </div>
        </React.Fragment>
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
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`nav-btn ${index === activeContentIndex ? "active" : ""}`}
            onClick={() => setActiveContentIndex(index)}
          ></div>
        ))}
      </div>
    </section>
  )
}

export default Section
