import React from 'react';
import './ProductsBrandCard.css'

const ProductsBrandCard = ({ brand }) => {

  return (
    <div className="col-span-3 md:col-span-2 lg:col-span-1 justify-center items-center">
      <div className='shadow-lg py-6 px-2 rounded text-center'>
        <img className='brand-icon mx-auto' src={brand.icon} alt={brand.name} />
        <p className='text-gray-700 pt-3 text-base md:text-sm'>{brand.name}</p>
      </div>
    </div>
  );
};

export default ProductsBrandCard;