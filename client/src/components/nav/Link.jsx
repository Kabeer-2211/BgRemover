import React from 'react';
import { NavLink } from 'react-router-dom';
import useMode from '../../hooks/useMode';

const Link = ({ label, to = '/' }) => {
    const { isDark } = useMode();
    return (
        <NavLink to={to} className={({ isActive }) => `text-lg font-serif py-3 w-fit relative before:absolute before:w-full before:h-1 before:bottom-0 before:rounded-md before:scale-x-0 hover:before:scale-x-100 before:transition-transform ${isDark ? 'before:bg-white text-white' : 'before:bg-primary text-black'} ${isActive ? 'before:scale-x-100' : ''}`}>{label}</NavLink>
    )
}

export default Link