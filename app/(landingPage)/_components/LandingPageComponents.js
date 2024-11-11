import React from 'react';
import ImageComponent from '@/components/ui/Image';
import Languages from '@/components/ui/Languages';
import RotatingDisc from '@/components/ui/RotatingDisc';
import Spectrum from '@/components/ui/Spectrum';
import Image from 'next/image';
import Card from '@/components/Card';

const LandingPageComponents = () => {
  return (
    <>
      <Languages />
      <div className='grid grid-cols-6'>
        <div className='col-span-2'>
          <RotatingDisc imgUrl='/honeysingh.webp' size={96} />
        </div>
        <div className='col-span-2 border-l-4 border-yellow-400 border-dashed'>
          <Spectrum />
        </div>
        <div className='col-span-2'>
          <RotatingDisc imgUrl='/KGF.webp' size={96} />
        </div>
      </div>

      <div className='flex items-center justify-center mx-auto mt-20 gap-4'>
        <ImageComponent imageUrl='/flowchart.png' width={200} height={300} />
        
        <div className='ml-10'>
          <RotatingDisc imgUrl='/sairat.webp' size={96} />
        </div>
      </div>

      <Card imageUrl={'/cafe.jpg'}/>

      <div className='flex items-center justify-center mx-auto m-20'>
        <Image
          src='/flowchart.png'
          width={750}
          height={450}
          alt='flowchart'
          className='rounded-lg bg-transparent'
        />
      </div>
    </>
  );
};

export default LandingPageComponents;
