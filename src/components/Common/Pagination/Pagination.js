import React, { useEffect, useState } from 'react';
import { countAllPost } from '../../../api';

const Pagination = ({ page, setPage, setSize, size }) => {
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        countAllPost().then(res => {
            const count = res.data;
            const pages = Math.ceil(count / size);
            setPageCount(pages);
        });
    }, [size])
    return (
        <div className="mx-auto w-full max-w-xs p-4 mt-3 border">
            <p className='text-center mb-3 font-bold'>Page no</p>
            {
                [...Array(pageCount).keys()].map(num => <button key={num} className={`btn btn-sm mb-2 btn-primary ml-1 ${num + 1 === page ? 'btn-active' : 'btn-outline'}`} onClick={() => setPage(num + 1)}>{num + 1} </button>)
            }
            <select className="btn btn-sm mx-3 btn-primary btn-outline" defaultValue='10' onChange={e => { setSize(parseInt(e.target.value)); setPage(1) }}>
                <option value="5" className='bg-[#FFFFFF] font-semibold text-black'>5</option>
                <option value="10" className='bg-[#FFFFFF] font-semibold text-black'>10</option>
                <option value="15" className='bg-[#FFFFFF] font-semibold text-black'>15</option>
            </select>
        </div>
    );
};

export default Pagination;