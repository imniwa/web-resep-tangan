import React, { useEffect, useState } from 'react';

export default function Paginate(props) {
    const { pageCount, handle, current } = props;
    const paginateEl = [];

    const handleClick = (e) => {
        handle(+e.currentTarget.value);
    }
    
    const handleMinus = () => {
        if(current == 0){
            return;
        }
        handle((prev)=>prev-1);
    }
    
    const handlePlus = () => {
        if(current == pageCount-1){
            return;
        }
        handle((prev)=>prev+1);
    }

    for (let i = 0; i < pageCount; i++) {
        paginateEl.push(
            <li key={i}>
                <button type="button" 
                onClick={handleClick}
                value={i}
                className={`px-3 py-2 leading-tight ${i == current 
                    ? 'text-orange-600 bg-orange-50 border-orange-300 hover:bg-orange-100 hover:text-orange-700' 
                    :'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'}
                    border `}>
                    {i+1}
                </button>
            </li>
        )
    }

    return (
        <nav>
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <button type="button"
                    onClick={handleMinus}
                    className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Previous</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </button>
                </li>
                {
                    paginateEl
                }
                <li>
                    <button type="button"
                    onClick={handlePlus} 
                    className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Next</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </button>
                </li>
            </ul>
        </nav>

    )
}