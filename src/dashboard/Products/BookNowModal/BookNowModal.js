import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const BookNowModal = ({ htmlFor, successButtonName, modalData }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const date = format(new Date(), 'PP')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [disabled, setDisabled] = useState(false);

  // Add Product
  const handleBooking = data => {
    setDisabled(true)
    const booking = {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      priceAmount: modalData.sellPrice,
      productName: data.productName,
      productBrand: modalData.brand,
      productId: modalData._id,
      productThumbnail: modalData.productThumbnail,
      productCategory: modalData.category,
      buyerPhone: data.phoneNumber,
      location: data.location,
      paymentStatus: false,
      bookingDate: date,
    }
    // save doctor information to the database
    fetch('http://localhost:5000/booking', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('access-token')}`
      },
      body: JSON.stringify(booking)
    })
      .then(res => res.json())
      .then(result => {
        if (result.acknowledged) {
          toast.success(`${data.name} is added successfully`);
          navigate('/dashboard/bookings')
          setDisabled(false)
        } else {
          toast.error(`${result.message}`);
          setDisabled(false)
        }
      })
  }
  return (
    <div>
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label htmlFor={htmlFor} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-2xl text-center mb-5 pt-1">Fill the Form to Book the Product</h3>
          <div className="">
            <form onSubmit={handleSubmit(handleBooking)} className='flex flex-col gap-3'>
              <div>
                <p className="pb-2">User Name</p>
                <input {...register("name")} type="text" defaultValue={user?.displayName} placeholder="name" className="input input-bordered py-2 h-auto w-full rounded-md bg-gray-100" readOnly />
              </div>
              <div>
                <p className="pb-2">Email Address</p>
                <input {...register("email")} type="email" defaultValue={user?.email} placeholder="Email" className="input input-bordered py-2 h-auto w-full rounded-md bg-gray-100" readOnly />
              </div>
              <div>
                <p className="pb-2">Product Name</p>
                <input {...register("productName")} type="text" defaultValue={modalData?.name} placeholder="Product Name" className="input input-bordered py-2 h-auto w-full rounded-md bg-gray-100" readOnly />
              </div>
              <div>
                <p className="pb-2">Product Price ($)</p>
                <input {...register("product Price")} type="number" defaultValue={modalData?.sellPrice} placeholder="Product Price" className="input input-bordered py-2 h-auto w-full rounded-md bg-gray-100" readOnly />
              </div>
              <div>
                <p className="pb-2">Your Phone Number</p>
                <input {...register("phoneNumber", {
                  required: "Phone number is Required"
                })} type="text" placeholder="Enter Your Phone Number" className="input input-bordered py-2 h-auto w-full rounded-md" required />
                {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <p className="pb-2">Your Meeting Location</p>
                <input {...register("location", {
                  required: "Location is Required"
                })} type="text" placeholder="Enter Your Meeting Location" className="input input-bordered py-2 h-auto w-full rounded-md" required />
                {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
              </div>

              <div className="modal-action">
                <label htmlFor={htmlFor} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transhtmlFor=m border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 cursor-pointer">
                  Cancel
                </label>
                {
                  user && user.uid ?
                    <label htmlFor={htmlFor}>
                      <button type='submit' className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transhtmlFor=m bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 cursor-pointer" disabled={disabled}>
                        {successButtonName}
                      </button>
                    </label>
                    :
                    <Link to="/login" className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transhtmlFor=m bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 cursor-pointer">
                      Login First
                    </Link>
                }

              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
};

export default BookNowModal;