import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../../dashboard/utilities/LoadingSpinner/LoadingSpinner';
import ProductsBrandCard from './ProductsBrandCard/ProductsBrandCard';

const ProductsBrand = () => {
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/brands')
      const data = await res.json();
      return data;
    }
  })
  return (
    <div className="">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>Cars <span className='text-[#f06425]'>Brand</span></h2>
          </div>
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          <div className='py-5'>
            <div className="grid grid-cols-12 lg:grid-cols-8 gap-4">
              {
                brands?.map((brand, i) => <ProductsBrandCard brand={brand} key={i}></ProductsBrandCard>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsBrand;