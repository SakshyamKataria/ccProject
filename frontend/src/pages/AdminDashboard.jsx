import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FileText, Users, Download, Trash2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { token } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalFiles: 0, totalUsers: 0, recentUploads: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get('/api/files/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
        } catch (error) {
            console.error("Error fetching stats", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <ShieldAlert className="text-red-500" /> Admin Dashboard
                </h1>
                <p className="text-gray-500">Overview of the entire CampusVault system.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-2xl flex items-center gap-6 border-l-4 border-l-primary">
                    <div className="bg-primary/10 text-primary p-4 rounded-full"><FileText size={32} /></div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Total Files</p>
                        <p className="text-4xl font-bold">{stats.totalFiles}</p>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-2xl flex items-center gap-6 border-l-4 border-l-secondary">
                    <div className="bg-secondary/10 text-secondary p-4 rounded-full"><Users size={32} /></div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Total Users</p>
                        <p className="text-4xl font-bold">{stats.totalUsers}</p>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl flex items-center gap-6 border-l-4 border-l-yellow-500">
                    <div className="bg-yellow-500/10 text-yellow-500 p-4 rounded-full"><Download size={32} /></div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Storage Health</p>
                        <p className="text-2xl font-bold text-green-500">Good</p>
                    </div>
                </motion.div>
            </div>

            <div className="glass p-8 rounded-2xl">
                <h2 className="text-xl font-bold mb-6">Recent Uploads</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500">
                                <th className="pb-4 font-medium">File Title</th>
                                <th className="pb-4 font-medium">Uploader</th>
                                <th className="pb-4 font-medium">Date</th>
                                <th className="pb-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentUploads.map((file, idx) => (
                                <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                    <td className="py-4 font-medium">{file.title}</td>
                                    <td className="py-4 text-gray-500">{file.uploader_name}</td>
                                    <td className="py-4 text-gray-500">{new Date(file.upload_date).toLocaleDateString()}</td>
                                    <td className="py-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete File">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {stats.recentUploads.length === 0 && (
                                <tr><td colSpan="4" className="py-8 text-center text-gray-500">No recent uploads.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
