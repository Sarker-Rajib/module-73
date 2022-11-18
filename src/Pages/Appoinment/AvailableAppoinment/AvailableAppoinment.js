import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppoinmentOption from './AppoinmentOption';


const AvailableAppoinment = ({ selectedDate }) => {
    // const [appoinmentOption, setAppoinmentOption] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP')

    const { data: appoinmentOption = [], refetch , isLoading} = useQuery({
        queryKey: ['appoinmentOption', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/v2/appoinmentOptions?date=${date}`);
            const data = res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>        
    }
    // const { data: appoinmentOption = [] } = useQuery({
    //     queryKey: ['appoinmentOption'],
    //     queryFn: () => fetch('http://localhost:5000/appoinmentOptions')
    //         .then(res => res.json())
    // });

    // useEffect(() => {
    //     fetch('http://localhost:5000/appoinmentOptions')
    //         .then(res => res.json())
    //         .then(data => setAppoinmentOption(data));
    // }, []);

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
                        refetch={refetch}
                    ></BookingModal>
                }
            </div>
        </div>
    );
};

export default AvailableAppoinment;