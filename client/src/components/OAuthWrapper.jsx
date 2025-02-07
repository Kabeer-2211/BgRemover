import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import OAuth from './OAuth'

const OAuthWrapper = () => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <OAuth></OAuth>
        </GoogleOAuthProvider>
    )
}

export default OAuthWrapper
