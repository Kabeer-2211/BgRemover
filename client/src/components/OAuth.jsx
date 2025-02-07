import React from 'react'
import useMode from '../hooks/useMode'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from '../services/User'
import { authenticationSuccess } from './../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

const OAuth = () => {
    const { isDark } = useMode();
    const dispatch = useDispatch();
    const responseGoogle = async (authResult) => {
        try {
            const code = authResult.code;
            if (code) {
                const res = await googleAuth(code);
                if (res && res.success) {
                    dispatch(authenticationSuccess({ user: res.user, token: res.token }));
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
        redirect_uri: 'http://localhost:5173'
    });
    return (
        <button type='button' onClick={googleLogin} className={`px-4 py-2 mx-auto border flex gap-2 border-slate-300  rounded-lg ${isDark ? 'text-white hover:text-slate-500' : 'text-slate-700 hover:text-slate-900'}  hover:border-slate-400 hover:shadow transition duration-150`}>
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Login with Google</span>
        </button>
    )
}

export default OAuth
