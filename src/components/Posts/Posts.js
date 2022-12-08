import React from 'react';
import Post from './Post/Post'
import Loading from '../Common/Loading'
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector(state => state.posts);
    return (
        !posts.length ? (<Loading></Loading>) : (
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                {
                    posts.map(post => (
                        <div key={post._id} className='mx-2 mb-4'>
                            <Post post={post} setCurrentId={setCurrentId}></Post>
                        </div>
                    ))
                }
            </div>
        )
    );
};

export default Posts;