import React, { useEffect, useState } from 'react';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Pagination from '../Common/Pagination/Pagination';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    console.log(page, size);
    useEffect(() => {
        dispatch(getPosts(page, size))
    }, [currentId, dispatch, page, size]);
    return (
        <section className='w-full flex flex-col-reverse sm:grid md:grid-cols-3 grid-cols-2 justify-items-center sm:auto pb-32'>
            <div className='md:col-span-2 mx-5'><Posts setCurrentId={setCurrentId}></Posts></div>
            <div className='mb-20 w-full'>
                <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                <Pagination page={page} size={size} setPage={setPage} setSize={setSize}></Pagination>
            </div>
        </section>
    );
};

export default Home;