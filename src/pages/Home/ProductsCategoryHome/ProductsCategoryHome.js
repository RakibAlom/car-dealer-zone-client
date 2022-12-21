import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ProductsCategoryCard from '../../Products/ProductsCategory/ProductsCategoryCard/ProductsCategoryCard';
import LoadingSpinner from '../../../dashboard/utilities/LoadingSpinner/LoadingSpinner';

const ProductsCategoryHome = () => {

  const url = `https://car-dealer-zone-server.vercel.app/categories`
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(url)
      const data = await res.json();
      return data;
    }
  })

  return (
    <div className="bg-gray-100">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>Cars <span className='text-[#f06425]'>Category</span></h2>
            <Link to='/category' className='text-[#f06425] hover:underline hover:underline-offset-4'>View All</Link>
          </div>
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          <div className='py-5'>
            <div className="grid grid-cols-12 lg:grid-cols-6 gap-4">
              {
                categories?.slice(0, 6)?.map((category, i) => <ProductsCategoryCard category={category} key={i}></ProductsCategoryCard>)
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductsCategoryHome;