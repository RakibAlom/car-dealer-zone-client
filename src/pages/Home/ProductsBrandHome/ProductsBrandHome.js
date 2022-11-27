import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ProductsBrandCard from '../../Products/ProductsBrand/ProductsBrandCard/ProductsBrandCard';
const ProductsBrandHome = () => {

  const url = `http://localhost:5000/brands`

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
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
            <h2 className='text-2xl font-bold'>Cars <span className='text-[#f06425]'>Brand</span></h2>
            <Link className='text-[#f06425] hover:underline hover:underline-offset-4'>View All</Link>
          </div>

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

export default ProductsBrandHome;