import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FileText, Download, TrendingUp, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { token, user } = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/files', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFiles(res.data);
            } catch (error) {
                console.error("Error fetching files", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, [token]);

    const myUploads = files.filter(f => f.uploader_name === user.name); // Using name since uploader_id might not be passed directly in the query in all cases, or we can just rely on the count
    const recentUploads = files.slice(0, 4);

    if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-gray-500 mt-1">Here is what's happening in CampusVault today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-2xl flex items-center gap-6 border-l-4 border-l-primary">
                    <div className="bg-primary/10 text-primary p-4 rounded-full"><TrendingUp size={32} /></div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Total Resources</p>
                        <p className="text-4xl font-bold">{files.length}</p>
                    </div>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-2xl flex items-center gap-6 border-l-4 border-l-secondary">
                    <div className="bg-secondary/10 text-secondary p-4 rounded-full"><Award size={32} /></div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Your Contributions</p>
                        <p className="text-4xl font-bold">{myUploads.length}</p>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl flex items-center gap-6 border-l-4 border-l-blue-500">
                    <div className="bg-blue-500/10 text-blue-500 p-4 rounded-full"><Clock size={32} /></div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">New This Week</p>
                        <p className="text-4xl font-bold">{recentUploads.length}</p>
                    </div>
                </motion.div>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    Recently Added Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentUploads.map(file => (
                        <div key={file.id} className="glass p-5 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-shadow group">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="bg-primary/10 text-primary p-3 rounded-xl">
                                        <FileText size={24} />
                                    </div>
                                    <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                                        {file.category_name || 'General'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 line-clamp-1" title={file.title}>{file.title}</h3>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <p className="text-xs text-gray-400">By {file.uploader_name}</p>
                                <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition">
                                    <Download size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                    {recentUploads.length === 0 && (
                        <div className="col-span-full text-center p-12 text-gray-500 glass rounded-2xl">No recent uploads found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
