import React from 'react';

const Error = () => {
    return (
        <div className='py-48'>
            <h1 className='font-bold text-xl text-center mb-5 text-red-500'>Error</h1>
            <h1 className='font-bold text-xl text-center'>There is nothing in</h1>
            <h1 className='font-bold text-xl text-center mb-5 text-red-500'>"{window.location.href}"</h1>
            <h1 className='font-bold text-xl text-center'> this location</h1>
        </div>
    );
};

export default Error;