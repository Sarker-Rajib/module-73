import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const MyAppoinment = () => {
    const { currentUser } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${currentUser?.email}`;
    // console.log(currentUser);

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', currentUser?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('doctor_access_token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    // console.log(bookings);

    return (
        <div>
            <h3 className="text-3xl">My Appoinment</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.length > 0 && bookings?.map((booking, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appoinmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid &&
                                        <Link to={`/dashboard/payment/${booking._id}`}>
                                            <button className='btn btn-primary'>Pay</button>
                                        </Link>
                                    }
                                    {
                                        booking.price && booking.paid &&
                                        <span>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppoinment;