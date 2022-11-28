import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm/CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const booking = useLoaderData();
  // const navigation = useNavigation();
  const { productName, priceAmount } = booking;
  // if(navigation.state === "loading"){
  //     return <Loading></Loading>
  // }
  return (
    <div>
      <h3 className="text-3xl">Payment for {productName}</h3>
      <p className="text-xl">Please pay <strong>${priceAmount}</strong></p>
      <div className='w-96 my-12'>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            booking={booking}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;