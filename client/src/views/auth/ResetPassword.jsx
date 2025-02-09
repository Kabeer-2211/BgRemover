import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'

import useSession from '@hooks/useSession';
import useMode from '@hooks/useMode';
import useError from '@hooks/useError';

const ResetPassword = () => {
    const { isDark } = useMode();
    const { showError } = useError();
    const { resetPassword } = useSession();
    const { id, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        await resetPassword({ id, token, password });
    }
    return (
        <>
            <div className={`h-[86.1vh] w-full flex flex-col justify-center items-center relative ${isDark && 'bg-black'} `}>
                <div className='main-bg bg-primary w-full h-full absolute top-0 left-0'></div>
                <form className={`${isDark ? 'bg-charcoal text-white' : 'bg-white'} p-10 rounded-2xl w-96 shadow-lg`} onSubmit={handleSubmit}>
                    <h1 className='text-3xl font-semibold text-center mb-6'>Reset Password</h1>
                    <div className='flex flex-col gap-2 mt-4 mb-2'>
                        <h3 className='text-lg font-semibold'>New Password</h3>
                        <div className='relative'>
                            <input type={showPassword ? 'text' : 'password'} className='w-full px-4 py-2 rounded-full border-2' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <i className={`${showPassword ? 'ri-eye-line' : 'ri-eye-close-line'} ${isDark && 'text-black'} absolute py-.5 px-1 top-1.5 right-1 cursor-pointer text-2xl bg-white rounded-e-full`} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-4 mb-2'>
                        <h3 className='text-lg font-semibold'>Confirm Password</h3>
                        <div className='relative'>
                            <input type={showConfirmPassword ? 'text' : 'password'} className='w-full px-4 py-2 rounded-full border-2' placeholder='Retype Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <i className={`${showConfirmPassword ? 'ri-eye-line' : 'ri-eye-close-line'} ${isDark && 'text-black'} absolute py-.5 px-1 top-1.5 right-1 cursor-pointer text-2xl bg-white rounded-e-full`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                        </div>
                    </div>
                    <button className='bg-primary text-white px-4 py-2 rounded-full w-full mt-8 hover:bg-primary/90'>Reset Password</button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword