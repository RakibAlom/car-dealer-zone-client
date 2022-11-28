import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import LoadingSpinner from '../../../../dashboard/utilities/LoadingSpinner/LoadingSpinner';
import ProductCard from '../../ProductCard/ProductCard';

const BrandProducts = () => {
  const products = useLoaderData();
  const { state } = useNavigation();
  return (
    <div className="">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>Total Result Found: <span className='text-[#f06425]'>{products.length}</span></h2>
          </div>
          {
            state === 'loading' && <LoadingSpinner></LoadingSpinner>
          }
          <div className='py-5'>
            {
              products.length < 1 && <h2 className='text-center text-3xl text-[#f06425] py-36 font-bold'>No Data Found</h2>
            }
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

export default BrandProducts;