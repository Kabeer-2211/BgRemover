import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import useMode from '../hooks/useMode'
import useSession from '../hooks/useSession'
import useError from '../hooks/useError'

const ForgotPassword = () => {
    const { forgotPassword } = useSession();
    const { isDark } = useMode();
    const { showError } = useError();
    const [email, setEmail] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            showError('Please fill all fields');
            return;
        }
        const response = await forgotPassword({ email });
        if (response) {
            setIsVerified(true);
        }
    }
    return (
        <div className={`h-[86.1vh] w-full flex flex-col justify-center items-center relative ${isDark && 'bg-black'} `}>
            <div className='main-bg bg-primary w-full h-full absolute top-0 left-0'></div>
            {isVerified && <div className="flex items-center gap-3 p-4 mb-4 mt-10 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <i className="ri-information-line"></i>
                <span className="sr-only">Info</span>
                <div><span className="font-medium">Verify your email!</span> An email has been sent to your email address.</div>
            </div>}
            <form className={`${isDark ? 'bg-charcoal text-white' : 'bg-white'} p-10 rounded-2xl w-96 shadow-lg`} onSubmit={handleSubmit}>
                <h1 className='text-3xl font-semibold text-center mb-6'>Reset Password</h1>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Email</h3>
                    <input type="text" className='w-full px-4 py-2 rounded-full border-2' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className='bg-primary text-white px-4 py-2 rounded-full w-full mt-8 hover:bg-primary/90'>Send Email</button>
            </form>
        </div>
    )
}

export default ForgotPassword