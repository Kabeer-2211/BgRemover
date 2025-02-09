import useMode from '@hooks/useMode';

const Loader = () => {
    const { isDark } = useMode();
    return (
        <div className='fixed h-screen w-screen top-0 left-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
            <div className={`rounded-md h-16 w-16 border-4 border-t-4 ${isDark ? 'border-white' : 'border-primary'} animate-spin absolute`}></div>
        </div>
    )
}

export default Loader