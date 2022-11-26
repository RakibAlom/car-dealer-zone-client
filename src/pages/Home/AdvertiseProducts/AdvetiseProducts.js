import React from 'react';
import { Link } from 'react-router-dom';
const AdvetiseProducts = () => {
  return (
    <div className='md:container md:mx-auto'>
      <div className="advertise-section py-10">
        <div className='flex justify-between	 w-full'>
          <h2 className='text-2xl font-bold'>Advertise <span className='text-amber-600'>Cars</span></h2>
          <Link className='text-amber-600 hover:underline hover:underline-offset-4'>View All</Link>
        </div>
      </div>
    </div>
  );
};

export default AdvetiseProducts;