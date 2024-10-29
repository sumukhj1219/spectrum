'use client';
import React, { useState, useEffect } from 'react';

const Gif = () => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotate((prev) => prev + 5);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className='size-96 bg-gray-50 rounded-full bg-[url(/gif.webp)] bg-cover border-8 border-gray-600 border-dashed shadow-xl shadow-gray-50 transition-transform duration-100 ease'
    style={{ transform: `rotate(${rotate}deg)` }}
    >
    </div>
  )
}

export default Gif
