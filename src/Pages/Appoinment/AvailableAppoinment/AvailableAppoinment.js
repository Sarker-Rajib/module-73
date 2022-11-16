import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppoinmentOption from './AppoinmentOption';


const AvailableAppoinment = ({ selectedDate }) => {
    const [appoinmentOption, setAppoinmentOption] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/appoinmentOptions')
            .then(res => res.json())
            .then(data => setAppoinmentOption(data));
    }, []);

    return (
        <div className='my-16'>
            <p className='text-center text-secondary text-bold'>
                Available Appoinment : {format(selectedDate, 'PP')}
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    appoinmentOption.map(option => <AppoinmentOption
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}
                    ></AppoinmentOption>)
                }
                {
                    treatment &&
                    <BookingModal
                        selectedDate={selectedDate}
                        treatment={treatment}
                        setTreatment={setTreatment}
                    ></BookingModal>
                }
            </div>
        </div>
    );
};

export default AvailableAppoinment;