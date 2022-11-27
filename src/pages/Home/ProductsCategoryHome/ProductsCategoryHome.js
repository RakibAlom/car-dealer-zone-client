import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ProductsCategoryCard from '../../Products/ProductsCategory/ProductsCategoryCard/ProductsCategoryCard';

const ProductsCategoryHome = () => {

  const url = `http://localhost:5000/categories`

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(url)
      const data = await res.json();
      return data;
    }
  })

  return (
    <div className="bg-gray-100">
      <div className='md:container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>Cars <span className='text-[#f06425]'>Category</span></h2>
            <Link className='text-[#f06425] hover:underline hover:underline-offset-4'>View All</Link>
          </div>

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

export default ProductsCategoryHome;