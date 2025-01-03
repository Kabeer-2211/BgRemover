import React from 'react';
import useMode from '../../hooks/useMode';

const ToggleNav = ({ showMenu, setShowMenu }) => {
    const { isDark } = useMode();

    return (
        <div className='flex lg:hidden items-center gap-3'>
            {!showMenu ? <div className={`w-10 h-10 bg-secondary grid place-content-center rounded-md cursor-pointer hover:bg-opacity-80`} onClick={() => { setShowMenu(true) }}>
                <i className="ri-menu-3-line text-white text-xl"></i>
            </div> : <div className={`w-10 h-10 bg-secondary grid place-content-center rounded-md cursor-pointer hover:bg-opacity-80`} onClick={() => setShowMenu(false)}>
                <i className="ri-close-line text-white text-xl"></i>
            </div>}
        </div>
    )
}

export default ToggleNav