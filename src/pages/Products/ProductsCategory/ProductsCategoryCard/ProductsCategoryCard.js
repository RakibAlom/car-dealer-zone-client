import React from 'react'
import { Link } from 'react-router-dom';
import './ProductsCategoryCard.css'

const ProductsCategoryCard = ({ category }) => {

  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-1 justify-center items-center">
      <Link to={`/category/${category.slug}`}>
        <div className='shadow-lg py-6 bg-white px-2 rounded text-center hover:bg-[#f9dbc6]'>
          <img className='category-icon mx-auto' src={category?.icon} alt={category?.name} />
          <p className='text-gray-700 pt-3 text-base md:text-sm'>{category?.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductsCategoryCard;