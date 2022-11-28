import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BookingData = ({ booking, setDeleteBooking, count }) => {
  const { productId } = booking;
  const [loading, setLoading] = useState(false);
  const [bookingPorduct, setBookingPorduct] = useState(null)
  useEffect(() => {
    setLoading(true)
    fetch(`https://car-dealer-zone-server.vercel.app/product/${productId}`)
      .then(res => res.json())
      .then(data => {
        setBookingPorduct(data)
        setLoading(false)
      })
  }, [productId])

  return (
    <>
      <tr>
        <th>{count + 1}</th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="rounded w-16 h-12">
                <img src={booking?.productThumbnail} alt={booking?.productName} />
              </div>
            </div>
            <div>
              <div className="font-bold">{booking?.productName}</div>
              <div className="text-sm opacity-50">{booking?.name}</div>
            </div>
          </div>
        </td>
        <td>${booking?.priceAmount}</td>
        <td>{booking?.BookingDate}</td>
        <td>
          <div>
            <div className="font-bold">{booking?.productBrand}</div>
            <div className="text-sm opacity-50">{booking?.productCategory}</div>
          </div>
        </td>
        <td>
          <div>
            <div className="font-bold">{booking?.buyerPhone}</div>
            <div className="text-sm opacity-50">{booking?.location}</div>
          </div>
        </td>
        <td>
          {bookingPorduct?.sellStatus === true ?
            <label className="badge badge-success text-white">available</label>
            :
            <button className="badge badge-ghost" disabled>not available</button>
          }
        </td>
        <td>
          {
            bookingPorduct?.sellStatus === true ?
              booking?.paymentStatus === false ?
                <Link to={`/dashboard/payment/${booking._id}`}>
                  <label className="btn btn-sm rounded text-white">Pay</label>
                </Link>
                :
                <button className="btn btn-sm rounded text-white" disabled>Paid</button>
              : null
          }

        </td>
        <th>
          <label htmlFor="confirmAlert" className="btn btn-sm btn-error rounded text-white cursor-pointer" onClick={() => setDeleteBooking(booking)}><FaTrashAlt></FaTrashAlt></label>
        </th>
      </tr>
    </>
  );
};

export default BookingData;