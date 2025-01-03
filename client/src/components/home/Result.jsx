import { useRef, useState } from 'react';
import ResultLoader from './ResultLoader';
import ResultOpt from './ResultOpt';
import ResultImg from './ResultImg';
import ResultPlaceholder from './ResultPlaceholder';
import useMode from '../../hooks/useMode';

const Result = ({ images, handleDelete, handleFileChange, activeImage, setActiveImage }) => {
    const colors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFA500", "#800080", "#00FFFF", "#FFC0CB", "#A52A2A", "#808080", "#800000", "#808000", "#008000", "#000080", "#ADD8E6", "#F08080", "#90EE90", "#FFD700", "#D2691E", "#B22222", "#FF4500", "#2E8B57", "#48D1CC", "#7B68EE", "#9370DB", "#4682B4"];
    const {isDark} = useMode();
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const [showOriginal, setShowOriginal] = useState(false);
    const [color, setColor] = useState('transparent');
    const handleDownload = (name) => {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${name.split('.')[0]}-bg-removed.png`;
        link.click();
    }
    return (
        <div className='xl:container mx-auto flex flex-col items-center gap-7 my-7 px-10 w-full'>
            {images.map((item, index) => <div key={index} className='flex flex-col-reverse items-center lg:items-start lg:flex-row justify-center gap-6 w-full'>
                <div className={`w-full sm:w-3/4 lg:w-2/5 bg-white h-[65vh] rounded-lg shadow-xl png-bg relative ${index === activeImage ? 'block' : 'hidden'}`}>
                    {!item.submitted && <ResultLoader />}
                    <ResultImg showOriginal={showOriginal} item={item} color={color} canvasRef={canvasRef} />
                </div>
                <div className={`w-full sm:w-3/5 lg:w-1/4 ${isDark ? 'bg-ash' : 'bg-white'} h-[65vh] rounded-lg shadow-xl relative p-4 flex flex-col items-center ${index === activeImage ? 'block' : 'hidden'}`}>
                    {item.submitted ? <><div className='flex justify-center items-center gap-4 my-4'>
                        <button className='bg-emerald-green text-white px-6 py-2 font-semibold rounded-lg' onClick={() => setShowOriginal(true)}>Original</button>
                        <button className='bg-bright-azure text-white px-6 py-2 font-semibold rounded-lg' onClick={() => setShowOriginal(false)} disabled={!item.submitted}>Result</button>
                    </div>
                        <div className='w-full px-3 py-4 flex justify-start items-center flex-wrap gap-2'>
                            <i className="ri-indeterminate-circle-line w-8 h-8 text-3xl text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setColor('transparent')}></i>
                            {colors.map((color, i) => <button className={`w-8 h-8 rounded-full hover:opacity-80 border border-gray-400`} style={{ backgroundColor: color }} key={i} onClick={() => setColor(color)}></button>)}
                            <div className='flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-400 relative cursor-pointer' style={{ backgroundColor: color }}>
                                <input type="color" className='w-full h-full absolute top-0 left-0 opacity-0' value={color} onChange={(e) => setColor(e.target.value)} />
                                <i className="ri-add-line"></i>
                            </div>
                        </div>
                        <button className='bg-primary text-white px-4 py-2 font-semibold rounded-full w-3/4 mt-auto' onClick={() => handleDownload(item.file.name)}>Download</button>
                    </> : <ResultPlaceholder />}
                </div>
            </div>)}
            <div className="container mx-auto flex justify-center items-center gap-3">
                <div className='w-16 h-16 bg-emerald-green cursor-pointer hover:bg-emerald-green/80 rounded-lg flex justify-center items-center' onClick={() => fileInputRef.current.click()}>
                    <input type="file" className='hidden' ref={fileInputRef} accept='image/jpeg, image/png, image/jpg, image/webp' multiple onChange={handleFileChange} />
                    <i className="ri-image-add-line text-2xl text-white"></i>
                </div>
                {images.map((item, index) => <div key={index}>
                    <ResultOpt image={URL.createObjectURL(item.file)} isActive={index === activeImage} isLoading={!item.submitted} onClick={() => setActiveImage(index)} onDelete={() => handleDelete(index)} />
                </div>)}
            </div>
        </div >
    )
}

export default Result