import React from 'react';
import appoinment from '../../../../src/assets/images/appointment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const ContsctUs = () => {
    return (
        <section
        className="py-16"
            style={{ background: `url(${appoinment})` }}
        >
            <div className='max-w-screen-sm mx-auto text-center'>
                <h1 className='bold text-primary text-center text-xl'>Contact US</h1>
                <h2 className='text-4xl pb-6 pt-2 text-white'>Stay Connected With US</h2>

                <form>
                    <input className='w-full my-2 p-2 rounded-md' type="email" name="email" id="email" placeholder='Email Address' />
                    <input className='w-full my-2 p-2 rounded-md' type="text" name="subject" id="sub" placeholder='Subject' />
                    <textarea className="w-full my-2 p-2 rounded-md" name="message" id="message" rows="6" placeholder='Your Message'></textarea>
                    <PrimaryButton>Submit</PrimaryButton>
                </form>
            </div>
        </section>

    );
};

export default ContsctUs;