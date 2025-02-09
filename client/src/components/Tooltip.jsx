import useMode from '@hooks/useMode';

const Tooltip = ({ children, text, position = 'top-12 left-0' }) => {
    const { isDark } = useMode();
    return (
        <div className='group relative'>
            {children}
            <div className={`bg-gray-200 text-sm p-2 rounded-lg absolute ${position} text-nowrap mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${isDark ? 'text-white' : 'text-black'}`}>{text}</div>
        </div>
    )
}

export default Tooltip