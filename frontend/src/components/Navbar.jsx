import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, LogOut, User, Menu, X } from 'lucide-react';

const Navbar = ({ onMenuToggle, isMenuOpen, showMenuToggle }) => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 w-full px-4 md:px-6 py-4 flex justify-between items-center transition-colors duration-300">
            <div className="flex items-center gap-3">
                {showMenuToggle && (
                    <button onClick={onMenuToggle} className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}
                <Link to="/" className="text-xl md:text-2xl font-bold text-primary dark:text-blue-400 flex items-center gap-2">
                    <span className="bg-primary text-white p-1 rounded-lg">CV</span> <span className="hidden sm:block">CampusVault</span>
                </Link>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {user ? (
                    <div className="hidden md:flex items-center gap-4">
                        <Link to={user.role === 'Admin' ? '/admin' : '/dashboard'} className="font-medium hover:text-primary transition">
                            Dashboard
                        </Link>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                            <User size={18} className="text-primary" />
                            <span className="text-sm font-semibold">{user.name}</span>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-1 text-red-500 hover:text-red-600 transition font-medium">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 md:gap-4">
                        <Link to="/login" className="font-medium hover:text-primary transition text-sm md:text-base">Login</Link>
                        <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-full text-sm md:text-base font-medium hover:bg-indigo-700 transition shadow-md">
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
