import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import memories from '../../images/memories.jpg'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase Authentication/firebase.init';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { AUTH, LOGOUT } from '../../constants/actionType';



const Navbar = () => {
    const [user] = useAuthState(auth);
    const [owner, setOwner] = useState(JSON.parse(localStorage.getItem('profile')));
    const [signOut] = useSignOut(auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (user) {
        const result = user?.reloadUserInfo;
        const token = user?.accessToken;
        dispatch({ type: AUTH, data: { result, token } })
    };

    const logout = async () => {
        await signOut();
        dispatch({ type: LOGOUT });
        navigate('/');
    }
    useEffect(() => {
        setOwner(JSON.parse(localStorage.getItem('profile')));
    }, [navigate])

    return (
        <div className='py-3'>
            < div className='flex sm:px-20 pl-7 pr-4 items-center justify-center py-1 rounded-lg bg-inherit shadow-xl sm:mx-20 bg-[#FFFFFF]' >
                <div className='flex items-center justify-center mr-auto'>
                    <Link to='/' className='text-primary font-bold sm:text-3xl text-2xl' > Memories</Link>
                    <Link to='/'><img className='w-12 ml-3 sm:ml-10 sm:w-20 rounded-lg' src={memories} alt="" /></Link>
                </div>

                {user ?
                    <div className='ml-auto flex justify-center items-center'>
                        <p className='mr-2 hidden md:block text-xs text-neutral'>{owner?.result?.displayName?.split(' ').slice(0, 2).join(' ')}</p>
                        <button className='btn btn-ghost border border-secondary bg-red-100 hover:bg-secondary btn-xs hover:text-white w-fit' onClick={() => logout()}>Log out</button>
                    </div>
                    :
                    <div>
                        <Link to='/login' className='btn btn-ghost border border-teal-600 bg-teal-100 hover:bg-neutral btn-xs hover:text-white w-fit'>Sign in</Link>
                    </div>}
            </div >
        </div>
    );
};

export default Navbar;
