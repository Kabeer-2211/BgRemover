import { useState, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css'
import useError from '../hooks/useError';
import useSession from '../hooks/useSession';
import useMode from '../hooks/useMode';
import Upload from '../components/home/upload';
import Result from '../components/home/Result';
import { removeBg } from '../services/BgRemover';

const Home = () => {
  const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const { isDark } = useMode();
  const { showError } = useError();
  const { isAuthenticated } = useSession();
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  const [limit, setLimit] = useState(isAuthenticated ? 4 : 2);
  useEffect(() => {
    setLimit(isAuthenticated ? 10 : 4);
  }, [isAuthenticated]);
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
  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
    if (activeImage == index) {
      setActiveImage(0);
    }
  }
  function isImageFile(file) {
    if (allowedFormats.includes(file.type)) {
      return true;
    } else {
      showError("Unsupported file format. Please upload a JPEG, PNG, JPG, or WebP image.");
      return false
    }
  }
  const handleFileChange = (e) => {
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
  useEffect(() => {
    const handlePaste = (event) => {
      if (images.length >= limit) {
        showError("You have reached the limit of " + limit + " images");
        return;
      }
      const clipboardItems = event.clipboardData.items;
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
    <div className={`${isDark && 'bg-charcoal'} min-h-[82vh]`}>
      <div className={`${isDark ? 'bg-charcoal' : 'bg-primary'} main-bg w-full h-full absolute top-0 left-0`}></div>
      {images.length === 0 && <><h1 className='text-5xl font-bold text-center mt-7 text-white'>Background Remover</h1>
        <div className='xl:container mx-auto flex flex-col items-center lg:flex-row lg:items-start lg:justify-center gap-7 my-7 px-10'>
          <Upload setImages={setImages} images={images} limit={limit} isImageFile={isImageFile} handleFileChange={handleFileChange} />
        </div></>}
      {images.length > 0 && <Result images={images} handleDelete={handleDelete} handleFileChange={handleFileChange} activeImage={activeImage} setActiveImage={setActiveImage} />}
    </div >
  )
}

export default Home