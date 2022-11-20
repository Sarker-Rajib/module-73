import React from 'react';

const AppoinmentOption = ({ option, setTreatment }) => {
    const { name, slots, price } = option;

    return (
        <div className='card bg-base-100 shadow-xl p-4'>
            <div className="text-center">
                <h2 className='text-2xl text-secondary'>{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'try another day'}</p>
                <p className='py-2'>{slots.length ? slots.length : 'no'} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <p className='pb-2'>Price : ${price}</p>

                <label
                    disabled={slots.length === 0}
                    htmlFor="booking-modal"
                    className="btn btn-primary"
                    onClick={() => setTreatment(option)}
                >
                    Book Appoinment
                </label>
            </div>
        </div>
    );
};

export default AppoinmentOption;