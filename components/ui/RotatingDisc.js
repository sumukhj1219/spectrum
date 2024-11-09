'use client';
import React, { useState, useEffect } from 'react';

const RotatingDisc = (props) => {
  const { imgUrl, size, border, shadow } = props; 
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotate((prev) => prev + 5); 
    }, 100);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div 
      className="size-96 rounded-full transition-transform duration-100 ease relative flex items-center justify-center" 
      style={{
        backgroundImage: `url(${imgUrl || '/honeysingh.jpg'})`, 
        backgroundSize: 'cover', 
        transform: `rotate(${rotate}deg)`,
        border: border || '8px double #a16207',
        boxShadow: shadow || '0px 0px 15px rgba(255, 204, 0, 0.6)',
      }}
    >
      <div
        className="size-24 rounded-full bg-gradient-to-r from-black from-10% via-gray-900 via-30% to-black to-90% m-2 max-w-7xl items-center justify-center mx-auto"
        style={{
          position: 'absolute',
          border: border || '8px double #a16207',
          boxShadow: shadow || '0px 0px 15px rgba(255, 204, 0, 0.6)',
        }}
      />
    </div>
  );
};

export default RotatingDisc;
