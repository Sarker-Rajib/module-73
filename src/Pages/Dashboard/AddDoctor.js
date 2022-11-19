import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();


    const { data: speacialities = [], isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpeciality')
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        // console.log(data.speciality);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);

                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speaciality: data.speciality,
                        image: imgData.data.url
                    }

                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json', 
                            authorization: `bearer ${localStorage.getItem("doctor_access_token")}`
                        },
                        body: JSON.stringify(doctor)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            toast('doctor added succesfully')
                            navigate('/dashboard/managedoctors')
                        }
                    })
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>

            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className='pb-3'>
                    <label className='label'>Name</label>
                    <input className='w-full input input-bordered' type='text'
                        {...register("name", {
                            required: 'name required'
                        })}
                    />
                    {errors.name && <p className='text-red-500' role='alert'>{errors.name?.message}</p>}
                </div>

                <div className='pb-3'>
                    <label className='label'>Email</label>
                    <input className='w-full input input-bordered' type='email'
                        {...register("email", {
                            required: 'Email required'
                        })}
                    />
                    {errors.email && <p className='text-red-500' role='alert'>{errors.email?.message}</p>}
                </div>
                <div className='pb-3'>
                    <label className='label'>Speciality</label>
                    <select
                        {...register("speciality")}
                        className="select select-primary w-full">

                        {
                            speacialities?.map(S => <option
                                key={S._id}
                                value={S.name}
                            >
                                {S.name}
                            </option>)
                        }
                    </select>
                </div>
                <div className='pb-3'>
                    <label className='label'>Photo</label>
                    <input className='w-full input input-bordered' type='file'
                        {...register("img", {
                            required: 'photo required'
                        })}
                    />
                    {errors.img && <p className='text-red-500' role='alert'>{errors.img?.message}</p>}
                </div>

                <input className='btn btn-accent w-full' type="submit" value='Add Doctor' />
            </form>
        </div>
    );
};


/**
 * three places to store images
 * 1. third party image hosting server
 * 2. file system of own server
 * 3. mongodb hosting
*/

export default AddDoctor;