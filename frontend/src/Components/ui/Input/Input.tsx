import React from 'react'
import './Input.css'
import { InputProps } from '../../../types'
const Input:React.FC<InputProps> = ({text,placeholder,onChange,value,onKeyDown}) => {
  return (
    <input className='Input' type={text} placeholder={placeholder} onChange={onChange} value={value} onKeyDown={onKeyDown} />
  )
}

export default Input