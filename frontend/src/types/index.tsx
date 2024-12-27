import React from "react";

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface InputProps {
  text?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void
}
