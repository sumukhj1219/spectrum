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
      className="size-96 rounded-full border-yellow-900 border-8 border-double shadow-lg shadow-yellow-900 transition-transform duration-100 ease hover:grayscale" 
      style={{
        backgroundImage: `url(${imgUrl || '/honeysingh.jpg'})`, 
        size: `${'96' || size}`,
        backgroundSize: 'cover', 
        transform: `rotate(${rotate}deg)`,
        border:`${border || '8px double yellow-900'}`,
        shadow: `${shadow || 'shadow-lg yellow-900'}`
      }}
    >
    </div>
  );
};

export default RotatingDisc;
