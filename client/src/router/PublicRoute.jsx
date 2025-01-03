import React from 'react'
import useSession from '../hooks/useSession';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useSession();
    if (isAuthenticated) {
        return <Navigate to='/' replace />
    }
    return children;
}

export default PublicRoute