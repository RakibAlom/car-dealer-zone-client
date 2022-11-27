import React from 'react';
import { Link } from 'react-router-dom';
const AdvetiseProducts = () => {
  return (
    <div className="">
      <div className='container md:mx-auto'>
        <div className="advertise-section py-10">
          <div className='flex justify-between w-full'>
            <h2 className='text-2xl font-bold'>Advertise <span className='text-amber-600'>Cars</span></h2>
          </div>
          <div className='py-5'>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                  <img className="object-cover object-center w-full h-56" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />

                  <div className="px-3 py-3">
                    <p className='text-dark font-bold'>$5000</p>
                    <h1 className="text-xl font-bold text-[#f06425] dark:text-white">Patterson johnson</h1>
                    <button className="mt-3 text-[#f06425] border	border-[#f06425] btn-block py-2 rounded hover:text-white hover:bg-[#FF731D]">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdvetiseProducts;