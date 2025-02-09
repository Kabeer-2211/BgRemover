import { useRef } from 'react';

import useMode from '@hooks/useMode';
import useBgRemover from '@hooks/useBgRemover';

const Upload = () => {
    const { isDark } = useMode();
    const fileInputRef = useRef(null);
    const { handleUpload, handleDrop } = useBgRemover();

    return (
        <>
            <div className={`${isDark ? 'bg-black' : 'bg-white'} w-full sm:w-4/5 lg:w-3/5 h-[65vh] shadow-xl rounded-lg p-6 cursor-pointer group transition-all duration-300`} onClick={() => fileInputRef.current.click()} onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
                <form onSubmit={e => e.preventDefault()} className={`${isDark ? 'border-2 border-white' : 'border-2 border-[#FDD7A0]'} w-full h-full border-dashed rounded-lg flex flex-col justify-center items-center font-medium group-hover:border-primary relative`}>
                    <p className={`${isDark ? 'text-white' : 'text-black'}`}>Drag and drop your Image here</p>
                    <input type="file" className='hidden' ref={fileInputRef} onChange={handleUpload} accept='image/jpeg, image/png, image/jpg, image/webp' multiple />
                    <button className="flex items-center gap-2 px-10 h-12 my-3 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer">
                        <i className="ri-image-add-line text-xl"></i>
                        <span>Upload Image</span>
                    </button>
                    <p className='text-sm text-gray-500'>Paste your image (ctrl v)</p>
                    <p className='text-sm text-gray-400 absolute bottom-3 text-center font-normal'>Supported formats: .jpg, .jpeg, .png, .webp</p>
                </form>
            </div>
            <div className='w-full sm:w-3/4 lg:w-2/5 bg-white min-h-[65vh] rounded-lg flex justify-center items-end relative overflow-hidden png-bg'>
                <img src='/1.png' alt='demo' className='z-10' />
                <div className='absolute bottom-0 left-0 w-full h-full aspect-auto demo-bg'></div>
            </div>
        </>
    )
}

export default Upload 