'use client'
import React, { useState, useEffect } from 'react';

const Languages = () => {
    const languages = ['en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur'];
    const languageOptions = {
      en: 'Song',       // English
      hi: 'गीत',        // Hindi
      bn: 'গান',        // Bengali
      ta: 'பாடல்',       // Tamil
      te: 'పాట',        // Telugu
      mr: 'गाणे',       // Marathi
      gu: 'ગીત',        // Gujarati
      kn: 'ಹಾಡು',       // Kannada
      ml: 'ഗാനം',       // Malayalam
      pa: 'ਗੀਤ',        // Punjabi
      or: 'ଗୀତ',        // Odia
      as: 'গীত',        // Assamese
      ur: 'گانا'        // Urdu
    };

  const [language, setLanguage] = useState(languages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLanguage((prevLang) => {
        const currentIndex = languages.indexOf(prevLang);
        const nextIndex = (currentIndex + 1) % languages.length;
        return languages[nextIndex];
      });
    }, 150);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className='flex flex-col items-center justify-center mx-auto mt-10'>
      <h1 lang={language} aria-label="Language Display" className='text-7xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 bg-clip-text text-transparent p-5'>
        {languageOptions[language]}
      </h1>
    </div>
  );
};

export default Languages;
