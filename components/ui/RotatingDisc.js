'use client';
import React, { useState, useEffect } from 'react';

const RotatingDisc = (props) => {
  const { imgUrl, size, border, shadow } = props;
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotate((prev) => prev + 2); 
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="size-96 rounded-full transition-transform duration-20 ease relative flex items-center justify-center border border-white"
      style={{
        backgroundImage: `url(${imgUrl || '/honeysingh.webp'})`, 
        backgroundSize: 'cover',
        transform: `rotate(${rotate}deg)`,
        border: border, 
      }}
    >
      <div
        className="absolute rounded-full border border-white opacity-40"
        style={{
          width: '30%', 
          height: '30%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 1%, rgba(255, 255, 255, 0.6) 1%)',
        }}
      />
      
      <div
        className="absolute rounded-full border border-white bg-transparent"
        style={{
          width: '10%', 
          height: '10%',
        }}
      />
    </div>
  );
};

export default RotatingDisc;
