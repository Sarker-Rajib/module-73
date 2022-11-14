import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState();

    const handleLogin = (data) => {
        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                setLoginError(error.message)
                console.error(error)
            })
    };

    return (
        <div className='max-w-sm mx-auto border p-4 rounded-xl'>
            <h2 className='text-center text-3xl pb-4'>Please Login</h2>

            <form onSubmit={handleSubmit(handleLogin)}>
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
                            minLength: { value: 6, message: 'Password must be min 6 charecter' }
                        })}
                    />
                    {errors.password && <p className='text-red-500' role='alert'>{errors.password?.message}</p>}
                    <label className='label'>Forget Password</label>
                </div>

                <input className='btn btn-accent w-full' type="submit" />
            </form>
            <p className='text-amber-600'>{loginError && <span>{loginError}</span>} </p>
            <p className='label'>New to doctors Portal? <Link className='text-secondary' to='/signup'>Create new Account</Link></p>
            <div className="divider">or</div>
            <button className="btn w-full btn-outline">Continue With Google</button>
        </div>
    );
};

export default Login;