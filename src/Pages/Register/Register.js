import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [createdEmail, setCreatedEmail] = useState('');
    const [token] = useToken(createdEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    console.log(token);

    const handleSignUp = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User created successfully')

                const profile = {
                    displayName: data.name
                }

                console.log(profile);

                updateUser(profile)
                    .then(() => {
                        saveUserDB(data.name, data.email);
                    })
                    .catch(err => console.error(err));
            })
            .catch(error => console.error(error));
    };

    const saveUserDB = (name, email) => {
        const dbUser = { name, email }

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(dbUser)
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                setCreatedEmail(data.email);
            })
    };


    return (
        <div className='max-w-sm mx-auto border p-4 rounded-xl'>
            <h2 className='text-center text-3xl pb-4'>Register</h2>

            <form onSubmit={handleSubmit(handleSignUp)}>
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
                    <label className='label'>Password</label>
                    <input className='w-full input input-bordered' type='password'
                        {...register("password", {
                            required: 'Password required',
                            minLength: { value: 6, message: 'Password must be min 6 charecter' },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })}
                    />
                    {errors.password && <p className='text-red-500' role='alert'>{errors.password?.message}</p>}
                </div>

                <input className='btn btn-accent w-full' type="submit" value='Sign Up' />
            </form>
            <p className='label'>Already Have an Account? <Link className='text-secondary' to='/login'>Login</Link></p>
            <div className="divider">or</div>
            <button className="btn w-full btn-outline">Continue With Google</button>
        </div>
    );
};

export default Register;