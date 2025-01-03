import { useEffect } from 'react';

const ResultImg = ({ showOriginal, item, color, canvasRef }) => {
    useEffect(() => {
        if (!item.result) return;
        if (showOriginal || !item.submitted) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.style.width = '100%';
        img.style.height = '100%';
        img.onload = () => {
            const parent = canvas.parentNode;
            const parentWidth = parent.offsetWidth;
            const parentHeight = parent.offsetHeight;

            canvas.width = parentWidth;
            canvas.height = parentHeight;

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    }, [item.result, item.submitted, color]);
    return (
        <>
            <canvas ref={canvasRef} style={{ backgroundColor: color }} className={`${(!showOriginal && item.submitted) ? 'block' : 'hidden'}`} />
            {(!showOriginal && item.submitted) ? <></> : <img src={item.r_src || URL.createObjectURL(item.file)} alt="demo" className="w-full h-full object-contain" />}
        </>
    )
}

export default ResultImg