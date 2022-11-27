import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../Products/ProductCard/ProductCard';
const ProductsHome = ({ products }) => {
  return (
    <div className="bg-gray-100">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>Cars <span className='text-[#f06425]'>Zone</span></h2>
            <Link className='text-[#f06425] hover:underline hover:underline-offset-4'>View All</Link>
          </div>
          <div className='py-5'>
            <div className="grid grid-cols-12 gap-4">
              <ProductCard></ProductCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHome;