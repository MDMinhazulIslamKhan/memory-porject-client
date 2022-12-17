import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import auth from '../../Firebase Authentication/firebase.init';
const Form = ({ currentId, setCurrentId }) => {
    const [isUser] = useAuthState(auth);
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: {} });
    const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const clear = () => {
        setCurrentId(0)
        setPostData({ title: '', message: '', tags: '', selectedFile: {} });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            await dispatch(updatePost(currentId, { ...postData, name: user?.result?.displayName }));
        }
        else {
            dispatch(createPost({ ...postData, name: user?.result?.displayName }));
        }
        clear();
    };
    return (
        <div className="">
            {isUser ?
                <form autoComplete='off' className="form-control mx-auto w-full max-w-xs border p-4" noValidate onSubmit={handleSubmit} action="">
                    <label className="label">
                        <span className="label-text sm:text-xl text-center w-full">{currentId ? 'Editing' : `Creating`} a Memory</span>
                    </label>
                    <input type="text" name='title' label='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} placeholder='Title' className="input input-bordered w-full max-w-xs mb-2" />
                    <input type="text" name='message' label='Message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} placeholder='Message' className="input input-bordered w-full max-w-xs mb-2" />
                    <input type="text" name='tags' label='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} placeholder='Tags (coma separated)' className="input input-bordered w-full max-w-xs mb-2" />
                    <FileBase type="file" multiple={false} onDone={(base64) => setPostData({ ...postData, selectedFile: base64 })} />
                    <button type="submit" className='input input-bordered w-full max-w-xs mt-2 bg-primary text-white font-bold'>Submit</button>
                    <button type='button' className='input input-bordered h-1/2 max-w-xs mt-2 bg-secondary text-white font-bold' onClick={clear}>Clear</button>
                </form> :
                <p className="form-control mx-auto w-full max-w-xs border p-4 bg-white rounded-lg">Please Sign In to create your own memories and like's post</p>
            }
        </div>
    );
};

export default Form;