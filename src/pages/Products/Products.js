import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../dashboard/utilities/LoadingSpinner/LoadingSpinner';
import ProductCard from './ProductCard/ProductCard';

const Products = ({ category }) => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products`)
      const data = await res.json()
      return data
    }
  })
  return (
    <div className="">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'><span className='text-[#f06425]'>{category}</span>Cars</h2>
          </div>

          {isLoading && <LoadingSpinner></LoadingSpinner>}

          <div className='py-5'>
            <div className="grid grid-cols-12 gap-4">
              {
                products?.map(product =>
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

export default Products;