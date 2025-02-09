import { useState } from 'react';

import useMode from '@hooks/useMode';
import useSession from '@hooks/useSession';
import ToggleNav from '@components/nav/ToggleNav';
import Link from '@components/nav/Link';
import ModeTogglBtn from '@components/nav/ToggleModeBtn';
import LoginBtn from '@components/nav/LoginBtn';
import ProfileBtn from '@components/nav/ProfileBtn';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { isDark } = useMode();
    const { isAuthenticated } = useSession();

    return (
        <>
            <nav className={`px-14 py-4 ${isDark ? 'bg-ash text-white' : 'bg-white'} flex justify-between items-center`}>
                <div className='text-4xl'>LOGO</div>
                <div className='hidden lg:flex items-center gap-12'>
                    <Link label='Home' to='/' />
                    <Link label='About Us' to='/about-us' />
                    <Link label='Contact Us' to='/contact-us' />
                </div>
                <div className='hidden lg:flex items-center gap-5'>
                    {isAuthenticated && <ProfileBtn />}
                    <ModeTogglBtn />
                    {!isAuthenticated && <LoginBtn />}
                </div>
                <ToggleNav showMenu={showMenu} setShowMenu={setShowMenu} />
            </nav>
            {showMenu && <div className={`${isDark ? 'bg-ash' : 'bg-white'} flex lg:hidden flex-col pb-8 px-14`}>
                <Link label='Home' to='/' />
                <Link label='About Us' to='/about-us' />
                <Link label='Contact Us' to='/contact-us' />
                <div className='flex items-center gap-3 mt-3'>
                    {isAuthenticated && <ProfileBtn />}
                    {!isAuthenticated && <LoginBtn />}
                    <ModeTogglBtn />
                </div>
            </div>}
        </>
    )
}
export default Navbar