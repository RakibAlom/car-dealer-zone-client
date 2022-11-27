import React from 'react';
import { Link } from 'react-router-dom';
import './ProductsBrandCard.css'

const ProductsBrandCard = ({ brand }) => {

  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-1 justify-center items-center">
      <Link to={`/brand/${brand.slug}`}>
        <div className='shadow-lg bg-white py-6 px-1 md:px-2 rounded text-center hover:bg-[#f9dbc6]'>
          <img className='brand-icon mx-auto' src={brand.icon} alt={brand.name} />
          <p className='text-gray-700 pt-3 text-base md:text-sm'>{brand.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductsBrandCard;