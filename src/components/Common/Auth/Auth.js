import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithGoogle, useCreateUserWithEmailAndPassword, useUpdateProfile, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase Authentication/firebase.init'
import { async } from '@firebase/util';

const Auth = () => {
    const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [
        signInWithEmailAndPassword,
        lInUser,
        lInLoading,
        lInError,
    ] = useSignInWithEmailAndPassword(auth);

    const [showPassword, handleShowPassWord] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    let errorMassage;
    if (gError || error || updateError || lInError) {
        errorMassage = <p className='text-red-500 my-2'><small>{error?.message || gError?.message || updateError?.message || lInError?.message}</small></p>
    }

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    useEffect(() => {
        if (gUser || user || lInUser) {
            navigate(from, { replace: true });
        }
    }, [gUser, user, lInUser, from, navigate]);

    const onSubmit = async () => {
        if (isSignUp) {
            signInWithEmailAndPassword(getValues().email, getValues().password)
        }
        else {
            await createUserWithEmailAndPassword(getValues().email, getValues().password);
            await updateProfile({ displayName: getValues().name })
        }
    };

    const googleSignIn = async () => {
        signInWithGoogle();
    };
    return (
        <div className='flex justify-center h-fit items-center py-10'>
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className='text-center font-bold text-xl mb-4 flex flex-col justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 rounded-full text-white bg-neutral border border-[#136e66] text-xl">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        {isSignUp ? 'Login' : 'Sign Up'}</h2>
                    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            {!isSignUp &&
                                <>
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Full Name"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Name is required'
                                            },
                                            minLength: {
                                                value: 3,
                                                message: 'Must be 3 characters or longer.'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                        {errors.name?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                    </label>
                                </>}
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Error'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                                {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block ml-5 w-5 h-5" onClick={() => handleShowPassWord(!showPassword)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block ml-5 w-5 h-5" onClick={() => handleShowPassWord(!showPassword)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                }
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Your Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer.'
                                    }
                                })}
                            ></input>
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {!isSignUp &&
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("cPassword", {
                                        required: {
                                            value: true,
                                            message: 'Confirm your password'
                                        },
                                        validate: (value) => value === getValues("password")
                                    })}
                                ></input>
                                <label className="label">
                                    {errors.cPassword?.type === 'required' && <span className="label-text-alt text-red-500">{errors.cPassword.message}</span>}
                                    {errors.cPassword?.type === 'validate' && <span className="label-text-alt text-red-500">{'Please make sure your passwords match'}</span>}
                                </label>
                            </div>
                        }
                        <div className={`form-control ${!errorMassage && 'mt-6'}`}>
                            {errorMassage}
                            <button className="btn btn-accent text-white font-bold">{isSignUp ? 'Login' : 'Sign Up'}</button>
                        </div>
                    </form>
                    <small>{!isSignUp ? 'Already have an account? ' : `Don't have an Account? `}? <span onClick={() => setIsSignUp(!isSignUp)} className='text-neutral cursor-pointer'>{!isSignUp ? `Log In` : 'Create new account'}</span></small>
                    <div className="divider">or</div>
                    <button
                        onClick={() => googleSignIn()}
                        className="btn btn-outline"
                    >CONTINUE WITH GOOGLE</button>
                </div>
            </div >
        </div >
    );
};

export default Auth;