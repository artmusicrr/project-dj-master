import { useState, useEffect } from "react"
import { SlideData } from "../types/typesAdm"

const useSlideData = () => {
  const [slideData, setSlideData] = useState<SlideData>({
    1: {
      title: "",
      sub_title: "",
      text: "",
      any_text: "",
      color_title: "",
      color_sub_title: "",
      color_text: "",
      color_any_text: "",
    },
    2: {
      title: "",
      sub_title: "",
      text: "",
      any_text: "",
      color_title: "",
      color_sub_title: "",
      color_text: "",
      color_any_text: "",
    },
    3: {
      title: "",
      sub_title: "",
      text: "",
      any_text: "",
      color_title: "",
      color_sub_title: "",
      color_text: "",
      color_any_text: "",
    },
    4: {
      title: "",
      sub_title: "",
      text: "",
      any_text: "",
      color_title: "",
      color_sub_title: "",
      color_text: "",
      color_any_text: "",
    },
    5: {
      title: "",
      sub_title: "",
      text: "",
      any_text: "",
      color_title: "",
      color_sub_title: "",
      color_text: "",
      color_any_text: "",
    },
  })

  useEffect(() => {
    const fetchSlideData = async () => {
      try {
        const response = await fetch("http://localhost:4000/title") // Substitua pela sua API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        const initialSlideData: SlideData = {
          1: {
            title: "",
            sub_title: "",
            text: "",
            any_text: "",
            color_title: "",
            color_sub_title: "",
            color_text: "",
            color_any_text: "",
          },
          2: {
            title: "",
            sub_title: "",
            text: "",
            any_text: "",
            color_title: "",
            color_sub_title: "",
            color_text: "",
            color_any_text: "",
          },
          3: {
            title: "",
            sub_title: "",
            text: "",
            any_text: "",
            color_title: "",
            color_sub_title: "",
            color_text: "",
            color_any_text: "",
          },
          4: {
            title: "",
            sub_title: "",
            text: "",
            any_text: "",
            color_title: "",
            color_sub_title: "",
            color_text: "",
            color_any_text: "",
          },
          5: {
            title: "",
            sub_title: "",
            text: "",
            any_text: "",
            color_title: "",
            color_sub_title: "",
            color_text: "",
            color_any_text: "",
          },
        }

        data.forEach((item: any) => {
          initialSlideData[item.id_text] = {
            title: item.title || "",
            sub_title: item.sub_title || "",
            text: item.text || "",
            any_text: item.any_text || "",
            color_title: item.color_title || "#000000",
            color_sub_title: item.color_sub_title || "#000000",
            color_text: item.color_text || "#000000",
            color_any_text: item.color_any_text || "#000000",
          }
        })

        setSlideData(initialSlideData)
      } catch (error: any) {
        console.error("Failed to fetch slide data", error)
      }
    }

    fetchSlideData()
  }, [])

  return slideData
}

export default useSlideData
