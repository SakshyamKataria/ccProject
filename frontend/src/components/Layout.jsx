import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const isPublicRoute = ['/', '/login', '/register'].includes(location.pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-background dark:bg-dark-background text-text dark:text-dark-text transition-colors duration-300">
            <Navbar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMenuOpen={isMobileMenuOpen} showMenuToggle={!isPublicRoute} />
            <div className="flex flex-1 overflow-hidden relative">
                {!isPublicRoute && <Sidebar isOpen={isMobileMenuOpen} />}
                
                {/* Backdrop for mobile */}
                {isMobileMenuOpen && !isPublicRoute && (
                    <div 
                        className="absolute inset-0 bg-black/50 z-30 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
                
                <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
