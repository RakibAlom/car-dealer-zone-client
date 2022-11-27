import React from 'react';
import { RotatingLines } from 'react-loader-spinner'

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center h-56'>
      <RotatingLines
        strokeColor="#f06425"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;