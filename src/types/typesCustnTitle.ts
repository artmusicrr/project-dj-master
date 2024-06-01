import React, { ReactNode } from "react"

export interface ICustonTitle {
  children?: React.ReactNode;
  defaultValue?: string
  showText?: (color: string) => JSX.Element | undefined;
  onChange?: (color: string) => void;
  color?: string;
  color_text?: string;
  color_sub_title?: string;
  color_title?: string;
  color_any_text?: string;
    
  }