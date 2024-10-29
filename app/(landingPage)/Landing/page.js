import Gif from '@/components/ui/Gif'
import ImageComponent from '@/components/ui/Image'
import Languages from '@/components/ui/Languages'
import RotatingDisc from '@/components/ui/RotatingDisc'
import Spectrum from '@/components/ui/Spectrum'
import React from 'react'


const Landing = async() => {

  return (
    <>
    <Languages />
    <div className='grid grid-cols-6'>
      <div className='col-span-2'>
        <RotatingDisc />
      </div>
      <div className='col-span-2 border-l-4 border-yellow-400 border-dashed'>
        <Spectrum />
      </div>
      <div className='col-span-2'>
        <Gif />
      </div>
    </div>
    <ImageComponent />
    </>
    
  )
}

export default Landing
