import React from 'react';

const Card = ({ imageUrl }) => {
  return (
    <div
      className={`w-[396px] h-[580px] m-5 bg-cover bg-center bg-transparent rounded-xl text-white flex items-start justify-start shadow-inner shadow-black p-6 hover:scale-105 hover:rotate-3 transition ease`}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className='text-left shadow-xl'>
        <h1 className='font-extrabold text-3xl text-white'>Enjoy your coffee with spectrum</h1> 
      </div>
    </div>
  );
};

export default Card;
