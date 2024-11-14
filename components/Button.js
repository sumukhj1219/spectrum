import React from 'react';

const Button = ({ className, name, onClick, loading }) => {
  return (
    <div className="flex">
      <button
        className={`${className} flex items-center justify-center px-4 py-2 rounded-md`}
        onClick={onClick}
        disabled={loading}
      >
        {/* {loading && (
         <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
       </svg>
        )} */}
        <span className="text-white">{name}</span>
      </button>
    </div>
  );
};

export default Button;
