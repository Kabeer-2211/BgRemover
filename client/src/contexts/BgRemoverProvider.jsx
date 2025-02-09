import { createContext, useEffect, useState, useRef, createRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useSession from '@hooks/useSession';
import useError from '@hooks/useError';
import { removeBg } from '@services/BgRemover';
import { addImage, deleteImage, setActiveImage, updateImage } from '@redux/slices/bgRemoverSlice';

export const BgRemoverContext = createContext();

const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const BgRemoverProvider = ({ children }) => {
    const { isAuthenticated } = useSession();
    const { showError } = useError();
    const dispatch = useDispatch();
    const { images, activeImage } = useSelector(state => state.bgRemover);
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
        dispatch(deleteImage(index));
        if (index === activeImage) {
            if (images.length === 0) {
                dispatch(setActiveImage(0));
            } else {
                dispatch(setActiveImage(index >= images.length ? images.length - 1 : index));
            }
        }
        refs.current = refs.current.filter((_, i) => index !== i);
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
                        dispatch(updateImage({ index: i, updatedImage: { submitted: true, result: result.data[0] } }));
                    }
                }
            }
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
                dispatch(addImage({ submitted: false, file, result: null, o_src: URL.createObjectURL(file) }));
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
                    dispatch(addImage({ submitted: false, file, result: null, o_src: URL.createObjectURL(file) }));
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
                            dispatch(addImage({ submitted: false, file, result: null, o_src: URL.createObjectURL(file) }));
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
            handleDelete,
            handleUpload,
            handleDrop,
            handleDownload,
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
