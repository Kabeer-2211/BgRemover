import { createContext, useEffect, useState, useRef, createRef } from 'react';
import useSession from '../hooks/useSession';
import useError from '../hooks/useError';
import { removeBg } from './../services/BgRemover';

export const BgRemoverContext = createContext();

const BgRemoverProvider = ({ children }) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const { isAuthenticated } = useSession();
    const { showError } = useError();
    const [images, setImages] = useState([]);
    const [activeImage, setActiveImage] = useState(0);
    const [limit, setLimit] = useState(isAuthenticated ? 4 : 2);
    const [showOriginal, setShowOriginal] = useState(false);
    const [color, setColor] = useState('#FFFFFF00');
    const refs = useRef([]);
    function isImageFile(file) {
        if (allowedFormats.includes(file.type)) {
            return true;
        } else {
            showError("Unsupported file format. Please upload a JPEG, PNG, JPG, or WebP image.");
            return false
        }
    }
    useEffect(() => {
        setLimit(isAuthenticated ? 4 : 2);
    }, [isAuthenticated]);
    const handleDelete = (e, index) => {
        e.stopPropagation();
        setImages((prevImages) => {
            const newImages = prevImages.filter((_, i) => i !== index);
            if (index === activeImage) {
                if (newImages.length === 0) {
                    setActiveImage(0);
                } else {
                    setActiveImage(index >= newImages.length ? newImages.length - 1 : index);
                }
            }
            return newImages;
        });
        refs.current = refs.current.filter(_, i => index !== i);
    }
    const handleDownload = (name, ref) => {
        const canvas = ref.current;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${name.split('.')[0]}-bg-removed.png`;
        link.click();
    }
    useEffect(() => {
        refs.current = images.map(() => createRef());
    }, [images]);
    useEffect(() => {
        async function removeBackground() {
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                if (!img.submitted) {
                    const _FORM = new FormData();
                    _FORM.append('image', img.file);
                    const result = await removeBg(_FORM);
                    if (result.success) {
                        setImages((prevImages) => {
                            const newImages = [...prevImages];
                            newImages[i] = { ...newImages[i], submitted: true, result: result.data[0] };
                            return newImages;
                        });
                    }
                }
            }
        }
        if (images.length > limit) {
            const newArr = images.slice(0, limit);
            setImages(newArr);
            showError("You have reached the limit of " + limit + " images");
        }
        removeBackground();
    }, [images]);
    const handleUpload = (e) => {
        if (images.length >= limit) {
            showError("You have reached the limit of " + limit + " images");
            return;
        }
        const files = e.target.files;
        for (const file of files) {
            if (isImageFile(file)) {
                setImages((prevImages) => [...prevImages, { submitted: false, file, result: null, o_src: URL.createObjectURL(file) }]);
            }
        }
    }
    const handleDrop = (e) => {
        e.preventDefault();
        if (images.length >= limit) {
            showError("You have reached the limit of " + limit + " images");
            return;
        }
        const droppedFiles = e.dataTransfer.files;
        const imageFiles = Array.from(droppedFiles).filter((file) =>
            file.type.startsWith("image/")
        );
        if (imageFiles.length > 0) {
            imageFiles.forEach(file => {
                if (isImageFile(file)) {
                    setImages((prevImages) => [...prevImages, { submitted: false, file, result: null, o_src: URL.createObjectURL(file) }]);
                }
            });
        } else {
            showError("No image files detected.");
        }
    }
    useEffect(() => {
        const handlePaste = (e) => {
            if (images.length >= limit) {
                showError("You have reached the limit of " + limit + " images");
                return;
            }
            const clipboardItems = e.clipboardData.items;
            for (let i = 0; i < clipboardItems.length; i++) {
                if (clipboardItems[i].kind === "file") {
                    const file = clipboardItems[i].getAsFile();
                    if (file) {
                        if (isImageFile(file)) {
                            setImages((prevImages) => [...prevImages, { submitted: false, file, result: null, o_src: URL.createObjectURL(file) }]);
                        }
                    }
                }
            }
        };
        document.addEventListener("paste", handlePaste);
        return () => {
            document.removeEventListener("paste", handlePaste);
        };
    }, []);

    return (
        <BgRemoverContext.Provider value={{
            images,
            handleDelete,
            handleUpload,
            handleDrop,
            handleDownload,
            setActiveImage,
            activeImage,
            setImages,
            showOriginal,
            setShowOriginal,
            color,
            setColor,
            refs
        }}>
            {children}
        </BgRemoverContext.Provider>
    )
}

export default BgRemoverProvider
