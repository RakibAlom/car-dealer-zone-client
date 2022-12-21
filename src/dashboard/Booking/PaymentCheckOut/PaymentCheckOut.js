import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaDollarSign } from 'react-icons/fa';

const PaymentCheckOut = ({ booking, closingModal, refetch }) => {
  const paymentDate = format(new Date(), 'PP')
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { productId, productName, priceAmount, ProdcutBrand, UserId, name, bookingDate, buyerPhone, email } = booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ priceAmount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [priceAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    }
    else {
      setCardError('');
    }
    setSuccess('');
    setProcessing(true);
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email
          },
        },
      },
    );

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log('card info', card);
      // store payment info in the database
      const payment = {
        productId, productName, priceAmount, ProdcutBrand, UserId, bookingId: booking._id, bookingDate, buyerPhone, name, email, paymentDate
      }
      fetch('http://localhost:5000/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.insertedId) {
            refetch();
            setSuccess('Congrats! your payment completed');
            setTransactionId(paymentIntent.id);
            toast.success('Congrats! your payment completed');
            closingModal();
          }
        })
        .catch(error => {
          console.error(error)
          toast.error('Something happened wrong!');
        })
    }
    setProcessing(false);


  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className='mt-5 btn btn-sm bg-secondary text-white rounded-md inline-flex gap-1 hover:bg-primary border-0 capitalize'
          type="submit"
          disabled={!stripe || !clientSecret || processing}>
          {
            processing ? 'Loading...'
              : <><FaDollarSign /> Pay</>
          }
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {
        success && <div>
          <p className='text-green-500'>{success}</p>
          <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
        </div>
      }
    </>
  );
};

export default PaymentCheckOut;