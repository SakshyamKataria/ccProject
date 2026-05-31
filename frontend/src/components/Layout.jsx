import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const isPublicRoute = ['/', '/login', '/register'].includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col bg-background dark:bg-dark-background text-text dark:text-dark-text transition-colors duration-300">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                {!isPublicRoute && <Sidebar />}
                <main className="flex-1 overflow-y-auto p-6 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
