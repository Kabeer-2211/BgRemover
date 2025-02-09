import { useState } from 'react'
import { Link } from 'react-router-dom'

import 'remixicon/fonts/remixicon.css'

import useMode from '@hooks/useMode'
import useSession from '@hooks/useSession'
import useError from '@hooks/useError'
import OAuthWrapper from '@components/OAuthWrapper'

const Signup = () => {
    const { signupUser } = useSession();
    const { isDark } = useMode();
    const { showError } = useError();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !password) {
            showError('Please fill all fields');
            return;
        }
        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }
        if (fullName.length < 3) {
            showError('Full name must be at least 3 characters');
            return;
        }
        const response = await signupUser({ name: fullName, email, password });
        if (response) {
            setIsVerified(true);
        }
    }
    return (
        <div className={`w-full p-10 flex flex-col justify-center items-center relative ${isDark && 'bg-black'}`}>
            <div className='main-bg bg-primary w-full h-full absolute top-0 left-0'></div>
            {isVerified && <div className="flex items-center gap-3 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <i className="ri-information-line"></i>
                <span className="sr-only">Info</span>
                <div><span className="font-medium">Verify your email!</span> An email has been sent to your email address.</div>
            </div>}
            <form className={`${isDark ? 'bg-charcoal text-white' : 'bg-white'} px-10 py-5 rounded-2xl w-96 shadow-lg`} onSubmit={handleSubmit}>
                <h1 className='text-3xl font-semibold text-center mb-6'>SIGNUP</h1>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Full Name</h3>
                    <input type="text" className='w-full px-4 py-2 rounded-full border-2' placeholder='Enter Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                    <h3 className='text-lg font-semibold'>Email</h3>
                    <input type="text" className='w-full px-4 py-2 rounded-full border-2' placeholder='Example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2 mt-4 mb-4'>
                    <h3 className='text-lg font-semibold'>Password</h3>
                    <div className='relative'>
                        <input type={showPassword ? 'text' : 'password'} className='w-full px-4 py-2 rounded-full border-2' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <i className={`${showPassword ? 'ri-eye-line' : 'ri-eye-close-line'} ${isDark && 'text-black'} absolute py-.5 px-1 top-1.5 right-1 cursor-pointer text-2xl bg-white rounded-e-full`} onClick={() => setShowPassword(!showPassword)}></i>
                    </div>
                </div>
                <p className='text-sm text-gray-500 text-center mt-2 ms-2'>Already have an account? <Link to='/login' className='font-semibold text-base hover:underline'>Login</Link></p>
                <button className='bg-primary text-white px-4 py-2 rounded-full w-full mt-8 hover:bg-primary/90'>Signup</button>
                <div className='text-slate-500 w-fit mx-auto my-3'>OR</div>
                <OAuthWrapper />
            </form>
        </div>
    )
}

export default Signup