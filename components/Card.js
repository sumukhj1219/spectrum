import React from 'react';

const Card = ({ imageUrl, placeholder }) => {
  return (
    <div
      className={`w-[396px] h-[580px] m-5 bg-cover bg-center bg-transparent rounded-xl text-white flex items-start justify-start shadow-inner hover:brightness-150 duration-500 shadow-black p-6 hover:scale-105 hover:rotate-3 transition ease `}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className='text-left bg-transparent border-none'>
        <span className='font-extrabold text-3xl text-white'>{placeholder}</span> 
      </div>
    </div>
  );
};

export default Card;
