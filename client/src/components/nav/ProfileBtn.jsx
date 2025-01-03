import { useState } from 'react';
import useSession from '../../hooks/useSession';
import Tooltip from '../Tooltip';
import useMode from '../../hooks/useMode';

const ProfileBtn = () => {
    const { user, logout } = useSession();
    const { isDark } = useMode();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className='relative'>
            <Tooltip text={user?.name}>
                <div className={`text-3xl font-semibold w-12 h-12 rounded-full flex items-center justify-center bg-primary border-2 text-white cursor-pointer ${isDark ? 'border-white' : 'border-secondary'}`} onClick={() => setShowDropdown(!showDropdown)}>{user?.name[0].toUpperCase()}</div>
            </Tooltip>
            <div className={`z-10 ${isDark ? 'bg-charcoal text-white' : 'bg-white text-gray-700'} rounded-lg shadow w-44 absolute top-12 -left-16 border mt-2 ${showDropdown ? 'opacity-100' : 'opacity-0'} transition-all duration-200`}>
                <ul className="py- font-semibold text-sm">
                    <li>
                        <button className={`block px-4 py-2 w-full rounded-lg ${isDark ? 'hover:bg-gray-600 hover:text-white' : 'hover:bg-gray-100'}`} onClick={() => {
                            logout();
                            setShowDropdown(false);
                        }}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileBtn