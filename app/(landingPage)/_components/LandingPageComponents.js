import React from 'react'
import Gif from '@/components/ui/Gif'
import ImageComponent from '@/components/ui/Image'
import Languages from '@/components/ui/Languages'
import RotatingDisc from '@/components/ui/RotatingDisc'
import Spectrum from '@/components/ui/Spectrum'
import Image from 'next/image'

const LandingPageComponents = () => {
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
    <div className='flex items-center justify-center mx-auto mt-20 gap-4'>
    <ImageComponent />
    <div className='ml-10'>
    <RotatingDisc imgUrl={'/kgf.webp'} size={96} border={'8px grey dashed'} shadow={'shadow-lg shadow-red'}/>
    </div>
    </div>
    <div className='flex items-center justify-center mx-auto m-20'>
        <Image src={'/flowchart.png'} width={750} height={450} alt='flowchart' className='rounded-lg shadow-lg shadow-black' />
    </div>
    </>
  )
}

export default LandingPageComponents
