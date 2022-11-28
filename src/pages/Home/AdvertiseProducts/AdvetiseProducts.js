import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../dashboard/utilities/LoadingSpinner/LoadingSpinner';
import AdvertiseProductCard from './AdvertiseProductCard/AdvertiseProductCard';
const AdvetiseProducts = () => {

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`https://car-dealer-zone-server.vercel.app/advertise-products`)
      const data = await res.json()
      return data
    }
  })
  return (
    <>
      {
        products.length > 0 ?
          < div className='container md:mx-auto'>
            <div className="advertise-section py-10">
              <div className='flex justify-between w-full'>
                <h2 className='text-2xl font-bold'>Advertise <span className='text-amber-600'>Cars</span></h2>
              </div>
              {isLoading && <LoadingSpinner></LoadingSpinner>}
              <div className='py-5'>
                <div className="grid grid-cols-12 gap-3">
                  {products.map(product =>
                    <AdvertiseProductCard product={product} key={product._id}></AdvertiseProductCard>

                  )}
                </div>
              </div>

            </div>
          </div>
          : null
      }

    </>
  );
};

export default AdvetiseProducts;