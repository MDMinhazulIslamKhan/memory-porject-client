import React from 'react';
import moment from 'moment';
import './post.css'
const Post = ({ post, setCurrentId }) => {
    const { selectedFile, title, createdAt, creator, tags, message, likeCount } = post;
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="postImage">
                <img src={selectedFile?.base64} alt="" />
                <div className="leftDetails">
                    <h2 className="font-bold text-white text-xl font-serif">{creator}</h2>
                    <p className="font-semibold text-white text-md font-mono">{moment(createdAt).fromNow()}</p>
                </div>
                <button className="rightDetails btn btn-ghost text-black font-bold text-2xl"
                    onClick={() => setCurrentId(post._id)}
                >...</button>
            </div>
            <p className='ml-3 italic text-sm h-5'>{tags.map(tag => tag && `#${tag} `)}</p>
            <div className="card-body items-center text-center my-0 py-0">
                <h2 className="card-title h-5">{title}</h2>
                <p>{message}</p>
            </div>
            <div className='flex justify-between'>
                <button className='ml-5 text-primary mb-2 flex items-center btn btn-ghost' onClick={() => { }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                    </svg>
                    <p className='ml-1 font-bold'>Like {likeCount}</p>
                </button>
                <button className='mr-5 text-primary mb-2 flex items-center btn btn-ghost' onClick={() => { }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                    <p className='ml-1 font-bold'>Delete</p>
                </button>
            </div>
        </div>
    );
};

export default Post;