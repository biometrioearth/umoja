import React from 'react';

const Button = ({ type, className, children, loading }) => {
  return (
    <button
      type={type}
      className={`flex w-full justify-center rounded-full  ${className}`}
      disabled={loading}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-4a4 4 0 11-7.917-1.25l-1.068-2.682A7.965 7.965 0 0012 4V2l8 4-8 4V9a5 5 0 10-2.999 4.582L6 15.291z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
