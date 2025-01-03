import React from 'react';
import Loader from './Loader';

const ResultOpt = ({ image, isActive, isLoading, onClick, onDelete }) => {
    return (
        <div className={`w-16 h-16 bg-white cursor-pointer overflow-hidden rounded-lg flex justify-center items-center border-2 relative group ${isActive ? 'border-emerald-green opacity-80' : 'border-gray-300'}`} onClick={onClick}>
            {isLoading && <Loader />}
            <i className="ri-delete-bin-6-line absolute top-0 right-1 text-red-500 font-semibold text-lg group-hover:opacity-100 opacity-0 transition-all duration-300" onClick={onDelete}></i>
            <img src={image} alt="demo" className='w-full h-full object-cover' />
        </div>
    )
}

export default ResultOpt