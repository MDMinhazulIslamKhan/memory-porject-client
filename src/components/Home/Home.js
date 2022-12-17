import React, { useEffect, useState } from 'react';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch]);
    return (
        <section className='w-full flex flex-col-reverse sm:grid md:grid-cols-3 grid-cols-2 justify-items-center sm:auto pb-32'>
            <div className='md:col-span-2 mx-5'><Posts setCurrentId={setCurrentId}></Posts></div>
            <div className='mb-20 w-full'><Form currentId={currentId} setCurrentId={setCurrentId}></Form></div>
        </section>
    );
};

export default Home;