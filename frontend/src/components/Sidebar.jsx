import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, FileText, Folder, File, UploadCloud, Users, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
    const { user } = useContext(AuthContext);

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
    ];

    const links = user?.role === 'Admin' ? adminLinks : studentLinks;

    return (
        <aside className="w-64 min-h-[calc(100vh-76px)] border-r border-gray-200 dark:border-gray-800 p-6 hidden md:block">
            <div className="flex flex-col gap-2">
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
        </aside>
    );
};

export default Sidebar;
