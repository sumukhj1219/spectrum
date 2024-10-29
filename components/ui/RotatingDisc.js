'use client';
import React, { useState, useEffect } from 'react';

const RotatingDisc = () => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotate((prev) => prev + 5); // Correctly update the rotation value
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      className={`size-96 bg-gray-50 rounded-full bg-[url(/honeysingh.jpg)] bg-cover border-yellow-900 border-8 border-double shadow-lg shadow-yellow-900 transition-transform duration-100 ease hover:grayscale`} 
      style={{ transform: `rotate(${rotate}deg)` }} // Apply rotation via inline style
    >
    </div>
  );
};

export default RotatingDisc;
