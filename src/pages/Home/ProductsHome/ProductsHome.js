import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../dashboard/utilities/LoadingSpinner/LoadingSpinner';
import ProductCard from '../../Products/ProductCard/ProductCard';
const ProductsHome = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/products')
      const data = await res.json();
      return data;
    }
  })
  return (
    <div className="bg-gray-100">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>Cars <span className='text-[#f06425]'>Zone</span></h2>
            <Link to='/cars' className='text-[#f06425] hover:underline hover:underline-offset-4'>View All</Link>
          </div>

          {isLoading && <LoadingSpinner></LoadingSpinner>}

          <div className='py-5'>
            <div className="grid grid-cols-12 gap-4">
              {
                products?.slice(0, 4)?.map(product =>
                  <ProductCard product={product} key={product._id}></ProductCard>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHome;