import Navbar from '@/components/Navbar';
import React from 'react';

const LandingPageLayout = ({ children }) => {
  return (
    <>
    <Navbar />
      <body className="max-w-7xl mx-auto p-6 min-h-screen mt-16 items-center justify-center">
        {children}
      </body>
    </>
  );
};

export default LandingPageLayout;
