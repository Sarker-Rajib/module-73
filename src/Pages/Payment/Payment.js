import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51M6E5GGlVVQhgeTVg3buNeCrsfvoJdQz0xDqTlBqJrE9hTjrEY8trnIKkNhYsyk43nTuRjzg7f5Y4zaD1mvUYv5800yiw4dA3S');

const Payment = () => {
    const booking = useLoaderData();

    return (
        <div className='p-4'>
            <h2>Payment for {booking.treatment}</h2>
            <p>Please pay {booking.price} for your appoinment</p>
            <div>
                <Elements stripe={stripePromise}>
                    <Checkout booking={booking}></Checkout>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;