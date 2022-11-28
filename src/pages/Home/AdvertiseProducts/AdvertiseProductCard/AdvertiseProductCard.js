import React, { useState } from 'react';
import BookNowModal from '../../../../dashboard/Products/BookNowModal/BookNowModal';

const AdvertiseProductCard = ({ product }) => {
  const [booking, setBooking] = useState('')
  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" key={product._id}>

        <div className="w-full max-w-sm overflow-hidden relative  bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className='bg-black flex w-10 justify-center text-white absolute top-0 right-0 rounded-bl-lg'>
            <small>Ads</small>
          </div>
          <img className="object-cover object-center w-full h-56" src={product?.productThumbnail} alt={product?.name} />

          <div className="px-3 py-3">
            <p className='text-dark font-bold'>${product?.sellPrice} {product?.originalPrice && <span className='font-light line-through text-[#f06425]'>${product?.originalPrice}</span>}</p>
            <h1 className="text-xl font-bold text-[#f06425] dark:text-white">{product?.name}</h1>
            <label htmlFor={`confrimBooking${product._id}`} onClick={() => setBooking(product)} className="mt-3 btn bg-transparent text-[#f06425] border border-[#f06425] btn-block py-2 rounded hover:text-white hover:bg-[#FF731D] hover:border-[#f06425]">Book Now</label>
          </div>

        </div>
        {
          booking && <BookNowModal
            htmlFor={`confrimBooking${product._id}`}
            successButtonName="Book Know"
            modalData={booking}
          >
          </BookNowModal>
        }
      </div>
    </>
  );
};

export default AdvertiseProductCard;