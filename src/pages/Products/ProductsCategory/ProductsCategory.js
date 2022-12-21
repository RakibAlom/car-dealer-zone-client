import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../../dashboard/utilities/LoadingSpinner/LoadingSpinner';
import ProductsCategoryCard from './ProductsCategoryCard/ProductsCategoryCard';

const ProductsCategory = () => {
  const url = `http://localhost:5000/categories`

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(url)
      const data = await res.json();
      return data;
    }
  })

  return (
    <div className="">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>All <span className='text-[#f06425]'>Category</span></h2>
          </div>
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          <div className='py-5'>
            <div className="grid grid-cols-12 lg:grid-cols-6 gap-4">
              {
                categories?.map((category, i) => <ProductsCategoryCard category={category} key={i}></ProductsCategoryCard>)
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductsCategory;