export interface SlideData {
  [key: string]: {
    title?: string
    sub_title?: string
    text?: string
    any_text?: string
    color_title?: string
    color_sub_title?: string
    color_text?: string
    color_any_text?: string
    font_size_title?: string
    font_weight_title?: string
    font_family_title?: string
    font_size_sub_title?: string
    font_weight_sub_title?: string
    font_family_sub_title?: string
    font_size_text?: string
    font_weight_text?: string
    font_family_text?: string
    font_size_any_text?: string
    font_weight_any_text?: string
    font_family_any_text?: string
  }
}

export interface Slide {
  id: number
  text: string
  title: string | null
  sub_title: string
  any_text: string
  color_title: string
  color_text: string
  color_sub_title: string
  color_any_text: string
  image_url: string
  font_size_title?: string
  font_weight_title?: string
  font_family_title?: string
  font_size_sub_title?: string
  font_weight_sub_title?: string
  font_family_sub_title?: string
  font_size_text?: string
  font_weight_text?: string
  font_family_text?: string
  font_size_any_text?: string
  font_weight_any_text?: string
  font_family_any_text?: string
}

export interface ICustonTitle {
  fontSize: number | null
  color: string
  slides: any[]
}
