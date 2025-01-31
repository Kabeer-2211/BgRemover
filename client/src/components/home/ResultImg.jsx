import { useEffect } from 'react';
import useBgRemover from './../../hooks/useBgRemover';

const ResultImg = ({ item, canvasRef }) => {
    const { showOriginal, color } = useBgRemover();
    useEffect(() => {
        if (item.result && !showOriginal || item.submitted) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = item.result;
        }
    }, [item, item.submitted, color]);
    return (
        <>
            <canvas ref={canvasRef} style={{ backgroundColor: color }} className={`w-full h-full ${(!showOriginal && item.submitted) ? 'block' : 'hidden'}`} />
            {(!showOriginal && item.submitted) ? null : <img src={item.o_src || URL.createObjectURL(item.file)} alt="demo" className="w-full h-full object-contain" />}
        </>
    )
}

export default ResultImg