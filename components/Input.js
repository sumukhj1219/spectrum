import React from 'react'

const Input = ({ size, width, placeholder, className, onChange, label }) => {
  return (
      <input 
        id='input'
        className={`w-${width || 72} size-${size || 10} ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
  )
}

export default Input
