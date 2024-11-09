import React from 'react'

const Button = ({className, name, onClick}) => {
  return  (
    <div className='flex'>
      <button className={`${className} `} onClick={onClick}>
        {name}
      </button>
    </div>
  )
}

export default Button
