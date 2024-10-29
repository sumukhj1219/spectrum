import React from 'react'
import Image from 'next/image'

const ImageComponent = () => {
  return (
    <div className='max-w-7xl mt-20'>
      <Image src='/image.png' className='rounded-xl shadow-black shadow-lg' width={700} height={300} alt='image' />
    </div>
  )
}

export default ImageComponent
