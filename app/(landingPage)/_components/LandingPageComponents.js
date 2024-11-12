import React from 'react';
import ImageComponent from '@/components/ui/Image';
import Languages from '@/components/ui/Languages';
import RotatingDisc from '@/components/ui/RotatingDisc';
import Spectrum from '@/components/ui/Spectrum';
import Image from 'next/image';
import Card from '@/components/Card';
import Sanskrit from '@/components/ui/Sanskrit';

const LandingPageComponents = () => {
  return (
    <>
      <Languages />
      <div className='grid grid-cols-6'>
        <div className='col-span-2'>
          <RotatingDisc imgUrl='/blueeyes.webp' size={96} />
        </div>
        <div className='col-span-2 border-l-4 border-yellow-400 border-dashed'>
          <Spectrum />
        </div>
        <div className='col-span-2'>
          <RotatingDisc imgUrl='/kgf.webp' size={96} />
        </div>
      </div>

      <div className='flex items-center justify-center mx-auto mt-20 gap-4'>
        <ImageComponent imageUrl='/flowchart.png' width={200} height={300} />
        
        <div className='ml-10'>
          <RotatingDisc imgUrl='/sairat.webp' size={96} />
        </div>
      </div>

      <div className='flex justify-between items-center'>
      <Card imageUrl={'/cafe.jpg'} placeholder={'Brew your perfect playlist with Spectrum.'}/>
        <Sanskrit />
      <Card imageUrl={'/family.jpg'} placeholder={'Create memories with family, powered by Spectrum'}/>
      </div>

      <div className='flex items-center justify-between'>
      <Card imageUrl={'/friends.avif'} placeholder={'Good vibes with great friends, only on Spectrum.'}/>
      <Image src={'/chess.webp'} width={300} height={300} alt='image' unoptimized={true} className='mb-20 hover:rotate-90 transition-all ease-in duration-1000 brightness-100'/>
      <Card imageUrl={'/samay.webp'} placeholder={'Create your vibe—stream and host rooms with Spectrum.'}/>
      </div>
      

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
