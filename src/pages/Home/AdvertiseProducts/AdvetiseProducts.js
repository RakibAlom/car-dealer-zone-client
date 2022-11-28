import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../dashboard/utilities/LoadingSpinner/LoadingSpinner';
const AdvetiseProducts = () => {
  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/advertise-products`)
      const data = await res.json()
      return data
    }
  })
  return (
    <div className="">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>Advertise <span className='text-amber-600'>Cars</span></h2>
          </div>
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          <div className='py-5'>
            <div className="grid grid-cols-12 gap-3">
              {products.map(product =>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" key={product._id}>
                  <div className="w-full max-w-sm overflow-hidden relative  bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className='bg-black flex w-10 justify-center text-white absolute top-0 right-0 rounded-bl-lg'>
                      <small>Ads</small>
                    </div>
                    <img className="object-cover object-center w-full h-56" src={product?.productThumbnail} alt={product?.name} />

                    <div className="px-3 py-3">
                      <p className='text-dark font-bold'>${product?.sellPrice}</p>
                      <h1 className="text-xl font-bold text-[#f06425] dark:text-white">{product?.name}</h1>
                      <button className="mt-3 text-[#f06425] border	border-[#f06425] btn-block py-2 rounded hover:text-white hover:bg-[#FF731D]">Buy Now</button>
                    </div>

                  </div>

                </div>

              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdvetiseProducts;