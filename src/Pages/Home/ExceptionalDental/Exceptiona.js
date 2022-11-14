import React from 'react';
import treatment from '../../../../src/assets/images/treatment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Exceptiona = () => {
    return (
        <div className='py-12 flex flex-col lg:flex-row' style={{alignItems:'center'}}>
            <figure className='shrink-0'>
                <img className='max-h-[560px] rounded-xl' src={treatment} alt="treatment" />
            </figure>
            <div className='lg:pl-8'>
                <h2 className='text-4xl pb-4'>Exceptional Dental Care, on Your Terms</h2>
                <p className='pb-4 text-lg'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <PrimaryButton>Get Started</PrimaryButton>
            </div>
        </div>
    );
};

export default Exceptiona;