import React, { useEffect } from 'react';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form'

import memories from './images/memories.jpg'
import './App.css'
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    return (
        <div>
            <div className='py-3'>
                < div className='flex gap-5 items-center justify-center py-1 rounded-lg bg-inherit shadow-xl sm:mx-20 bg-white' >
                    < h1 className='text-primary font-bold sm:text-4xl text-3xl' > Memories</h1 >
                    <img className='w-20 rounded-lg' src={memories} alt="" />
                </div >
            </div>
            <section className='flex flex-col-reverse sm:grid md:grid-cols-3 grid-cols-2 justify-items-center mx-5 sm:auto'>

                <div className='md:col-span-2'><Posts></Posts></div>
                <div className=''><Form></Form></div>
            </section>
        </div >
    );
};

export default App;