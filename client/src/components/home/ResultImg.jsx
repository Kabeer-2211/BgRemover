import { useEffect } from 'react';
import useBgRemover from './../../hooks/useBgRemover';

const ResultImg = ({ item, canvasRef }) => {
    const { showOriginal, color } = useBgRemover();
    console.log(canvasRef)
    useEffect(() => {
        if (item.result && !showOriginal || item.submitted) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                let drawWidth = canvas.width;
                let drawHeight = canvas.width / aspectRatio;

                if (drawHeight > canvas.height) {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * aspectRatio;
                }
                const x = (canvas.width - drawWidth) / 2;
                const y = (canvas.height - drawHeight) / 2;
                ctx.drawImage(img, x, y, drawWidth, drawHeight);
            }
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