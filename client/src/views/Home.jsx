import 'remixicon/fonts/remixicon.css';

import useMode from '@hooks/useMode';
import Upload from '@components/home/upload';
import Result from '@components/home/Result';
import useBgRemover from '@hooks/useBgRemover';

const Home = () => {
  const { isDark } = useMode();
  const { images } = useBgRemover();

  return (
    <div className={`${isDark && 'bg-charcoal'} min-h-[82vh]`}>
      <div className={`${isDark ? 'bg-charcoal' : 'bg-primary'} main-bg w-full h-full absolute top-0 left-0`}></div>
      {images.length === 0 && <><h1 className='text-5xl font-bold text-center mt-7 text-white'>Background Remover</h1>
        <div className='xl:container mx-auto flex flex-col items-center lg:flex-row lg:items-start lg:justify-center gap-7 my-7 px-10'>
          <Upload />
        </div></>}
      {images.length > 0 && <Result />}
    </div >
  )
}

export default Home