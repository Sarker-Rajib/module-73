import React from 'react';
import Banner from '../Banner/Banner';
import ContsctUs from '../ContactUs/ContsctUs';
import Exceptiona from '../ExceptionalDental/Exceptiona';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <Exceptiona></Exceptiona>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <ContsctUs></ContsctUs>
        </div>
    );
};

export default Home;