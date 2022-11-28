import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import ConfrimAlert from '../utilities/ConfirmAlert/ConfrimAlert';
import LoadingSpinner from '../utilities/LoadingSpinner/LoadingSpinner';
import BookingData from './BookingData/BookingData';

const Booking = () => {
  const { user } = useContext(AuthContext)
  const [deleteBooking, setDeleteBooking] = useState('')
  const [loading, setLoading] = useState(false);

  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ['bookings', user?.uid],
    queryFn: async () => {
      const res = await fetch(`https://car-dealer-zone-server.vercel.app/booking?uid=${user.uid}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('access-token')}`
        }
      })
      const data = await res.json()
      return data
    }
  })

  const handleBookingDelete = (booking) => {
    setLoading(true)
    fetch(`https://car-dealer-zone-server.vercel.app/booking/${booking._id}`, {
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
                <BookingData booking={booking} setDeleteBooking={setDeleteBooking} key={count} count={count}></BookingData>
              )
            }
          </tbody>
        </table>

        {
          loading && <LoadingSpinner></LoadingSpinner>
        }
        {
          isLoading && <LoadingSpinner></LoadingSpinner>
        }
      </div >
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