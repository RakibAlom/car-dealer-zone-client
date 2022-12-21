import { Elements } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegTimesCircle } from 'react-icons/fa';

import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import ConfrimAlert from '../utilities/ConfirmAlert/ConfrimAlert';
import LoadingSpinner from '../utilities/LoadingSpinner/LoadingSpinner';
import BookingData from './BookingData/BookingData';
import PaymentCheckOut from './PaymentCheckOut/PaymentCheckOut';

import { loadStripe } from '@stripe/stripe-js';
const stipePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const Booking = () => {
  const { user } = useContext(AuthContext)
  const [deleteBooking, setDeleteBooking] = useState('')
  const [singleBooking, setSingleBooking] = useState({})
  const [loading, setLoading] = useState(false);
  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ['bookings', user?.uid],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/booking?uid=${user.uid}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('access-token')}`
        }
      })
      const data = await res.json()
      return data
    }
  })

  const closingModal = () => {
    setSingleBooking({})
    refetch();
  }

  const bookingsPayment = booking => {
    console.log(booking);
    setSingleBooking(booking)
  }

  const handleBookingDelete = (booking) => {
    setLoading(true)
    fetch(`http://localhost:5000/booking/${booking._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch()
          setLoading(false)
          toast.success(`Booking ${booking.productName} deleted successfully!`)
        }
      })
      .catch(err => {
        console.error(err.message)
        toast.error('Something happened wrong!')
      })
  }

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <>
      <div className="overflow-x-auto w-full">
        <h3 className="text-lg font-medium leading-6 text-gray-900 pb-5">My Booking</h3>
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Brand</th>
              <th>Address</th>
              <th>Status</th>
              <th>Pay</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              bookings?.map((booking, count) =>
                <BookingData booking={booking} setDeleteBooking={setDeleteBooking} refetch={refetch} bookingsPayment={bookingsPayment} key={count} count={count}></BookingData>
              )
            }
            {bookings.length <= 0 &&
              <tr>
                <td colSpan="9">
                  <h2 className='text-center font-bold'>No Product Found</h2>
                </td>
              </tr>
            }
          </tbody>
        </table>

      </div >

      {/* Payment Modal */}
      {
        singleBooking?.priceAmount &&
        <>
          <input type="checkbox" id="paymentModal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label htmlFor="paymentModal" className='absolute top-3 right-3 text-xl text-red-600 cursor-pointer'><FaRegTimesCircle /></label>
              <h3 className="font-bold text-xl text-center pt-1">Give Payment to purchase product</h3>
              <h5 className="text-2xl text-[#f06425] font-semibold pt-3 text-center">Product Name: {singleBooking.productName}</h5>
              <h5 className="font-bold text-[#f06425] pt-2 pb-8 text-center">Amount: ${singleBooking.priceAmount}</h5>
              <Elements stripe={stipePromise}>
                <PaymentCheckOut
                  booking={singleBooking}
                  closingModal={closingModal}
                  refetch={refetch}
                ></PaymentCheckOut>
              </Elements>
            </div>
          </div>
        </>
      }


      {/* Confirm Delete Modal */}

      {
        deleteBooking && <ConfrimAlert
          htmlFor="confirmAlert"
          title={`Are you sure want to delete?`}
          message={`If you delete ${deleteBooking.productName}, it cannot be undone.`}
          successAction={handleBookingDelete}
          successButtonName="Delete"
          modalData={deleteBooking}
        >
        </ConfrimAlert>
      }

    </>

  );
};

export default Booking;