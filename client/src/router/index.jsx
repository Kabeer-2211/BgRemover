import React from 'react';

import { Routes, Route } from 'react-router-dom'

import Home from '@views/home';
import Login from '@views/Login';
import Signup from '@views/Signup';
import VerifyEmail from '@views/auth/VerifyEmail';
import PublicRoute from './PublicRoute';
import ForgotPassword from '@views/ForgotPassword';
import ResetPassword from '@views/auth/ResetPassword';
import BgRemoverProvider from '@contexts/BgRemoverProvider';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={
                <BgRemoverProvider>
                    <Home />
                </BgRemoverProvider>
            } />
            <Route path='/login' element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path='/signup' element={
                <PublicRoute>
                    <Signup />
                </PublicRoute>
            } />
            <Route path='/api/auth/:id/verify-email/:token' element={
                <PublicRoute>
                    <VerifyEmail />
                </PublicRoute>
            } />
            <Route path='/forgot-password' element={
                <PublicRoute>
                    <ForgotPassword />
                </PublicRoute>
            } />
            <Route path='/api/auth/:id/reset-password/:token' element={
                <PublicRoute>
                    <ResetPassword />
                </PublicRoute>
            } />
        </Routes>
    )
}

export default Router