import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const date = format(selectedDate, 'PP')
    const { name, slots } = treatment;
    const { currentUser } = useContext(AuthContext)
    // console.log(currentUser);

    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        const slot = form.slot.value;
        const ptname = form.name.value;
        const email = form.email.value;
        const number = form.number.value;

        const booking = {
            appoinmentDate: date,
            treatment: name,
            patient: ptname,
            slot,
            email,
            number,
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {                  
                    setTreatment(null);
                    toast.success('booking confirmed')
                    refetch();
                }
                else {
                    setTreatment(null);
                    toast.error(data.message)
                }
            })
        // console.log(slot, name, email, number);
        // console.log(booking);
    };

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>

                    <form onSubmit={handleBooking}>
                        <input className='input w-full my-2 border-slate-500 ' type="text" name="date" value={date} disabled />
                        <select className="select select-bordered w-full" name='slot'>
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}
                                >
                                    {slot}
                                </option>)
                            }
                        </select>
                        <input defaultValue={currentUser?.displayName} disabled={currentUser?.displayName !== null} className='input w-full my-2 border-slate-500 ' type="text" name="name" placeholder='Your Name' />
                        <input defaultValue={currentUser?.email} disabled className='input w-full my-2 border-slate-500 ' type="email" name="email" placeholder='Your email' />
                        <input className='input w-full my-2 border-slate-500 ' type="text" name="number" placeholder='Your Number' />
                        <input className='btn w-full mt-4' type="Submit" placeholder='' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;