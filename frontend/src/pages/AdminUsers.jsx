import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Users, ShieldAlert, User as UserIcon } from 'lucide-react';

const AdminUsers = () => {
    const { token } = useContext(AuthContext);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/auth/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsersList(res.data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Users className="text-primary" /> Manage Users
                </h1>
                <p className="text-gray-500 mt-1">View all registered students and admins.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
            ) : (
                <div className="glass p-6 rounded-2xl overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500">
                                <th className="pb-4 font-medium pl-4">Name</th>
                                <th className="pb-4 font-medium">Email</th>
                                <th className="pb-4 font-medium">Role</th>
                                <th className="pb-4 font-medium">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((u) => (
                                <tr key={u.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                    <td className="py-4 pl-4 font-medium flex items-center gap-3">
                                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                                            {u.role === 'Admin' ? <ShieldAlert size={16} className="text-red-500" /> : <UserIcon size={16} className="text-gray-500" />}
                                        </div>
                                        {u.name}
                                    </td>
                                    <td className="py-4 text-gray-500">{u.email}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === 'Admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {usersList.length === 0 && (
                                <tr><td colSpan="4" className="py-8 text-center text-gray-500">No users found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
