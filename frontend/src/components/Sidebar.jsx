import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, FileText, Folder, File, UploadCloud, Users, LayoutDashboard, LogOut, User } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const studentLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
        { name: 'Notes', path: '/notes', icon: <FileText size={20} /> },
        { name: 'Projects', path: '/projects', icon: <Folder size={20} /> },
        { name: 'Documents', path: '/documents', icon: <File size={20} /> },
        { name: 'Upload', path: '/upload', icon: <UploadCloud size={20} /> },
    ];

    const adminLinks = [
        { name: 'Admin Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
        { name: 'Manage Files', path: '/admin/files', icon: <File size={20} /> },
        { name: 'Upload Files', path: '/upload', icon: <UploadCloud size={20} /> },
    ];

    const links = user?.role === 'Admin' ? adminLinks : studentLinks;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className={`w-64 border-r border-gray-200 dark:border-gray-800 bg-background dark:bg-dark-background p-6 absolute md:static z-40 transition-transform duration-300 ease-in-out h-[calc(100vh-76px)] flex flex-col justify-between ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="flex flex-col gap-2 overflow-y-auto">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                                isActive
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`
                        }
                    >
                        {link.icon}
                        {link.name}
                    </NavLink>
                ))}
            </div>

            {user && (
                <div className="md:hidden mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <User size={18} className="text-primary" />
                        <span className="text-sm font-semibold truncate">{user.name}</span>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-3 rounded-xl transition font-medium">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
