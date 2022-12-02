import React, { useState } from 'react';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
const Form = () => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: {} });
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData);
        dispatch(createPost(postData));
    };
    const clear = (e) => {
        e.preventDefault();
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: {} });
    }
    return (
        <div className="w-full">
            <form autoComplete='off' className="form-control w-full max-w-xs border p-4" noValidate onSubmit={handleSubmit} action="">
                <label className="label">
                    <span className="label-text sm:text-xl text-center w-full">Creating a Memory</span>
                </label>
                <input type="text" name='title' label='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} placeholder='Title' className="input input-bordered w-full max-w-xs mb-2" />
                <input type="text" name='creator' label='Creator' value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} placeholder='Creator' className="input input-bordered w-full max-w-xs mb-2" />
                <input type="text" name='message' label='Message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} placeholder='Message' className="input input-bordered w-full max-w-xs mb-2" />
                <input type="text" name='tags' label='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} placeholder='Tags' className="input input-bordered w-full max-w-xs mb-2" />
                <FileBase type="file" multiple={false} onDone={(base64) => setPostData({ ...postData, selectedFile: base64 })} />
                <button type="submit" className='input input-bordered w-full max-w-xs mt-2 bg-primary text-white font-bold'>Submit</button>
                <button type="submit" className='input input-bordered h-1/2 max-w-xs mt-2 bg-secondary text-white font-bold' onClick={clear}>Clear</button>
            </form>
        </div>
    );
};

export default Form;