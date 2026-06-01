import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Download, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Notes = () => {
    const { token, user } = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchFiles();
    }, [search]);

    const fetchFiles = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/files?category=Notes&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFiles(res.data);
        } catch (error) {
            console.error("Error fetching files", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this file?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/files/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFiles();
        } catch (error) {
            alert("Error deleting file or unauthorized");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <BookOpen className="text-primary" /> Class Notes
                    </h1>
                    <p className="text-gray-500 mt-1">Access and share lecture notes with your classmates.</p>
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search notes..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.length === 0 ? (
                        <div className="col-span-full text-center p-12 text-gray-500 glass rounded-2xl">No notes found in this category. Be the first to upload!</div>
                    ) : (
                        files.map(file => (
                            <div key={file.id} className="glass p-5 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-shadow">
                                <div>
                                    <h3 className="font-bold text-lg mb-1 line-clamp-1" title={file.title}>{file.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{file.description}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                    <p className="text-xs text-gray-400">By {file.uploader_name} • {new Date(file.upload_date).toLocaleDateString()}</p>
                                    <div className="flex gap-2">
                                        <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="p-2 text-primary hover:bg-primary/10 rounded-full transition">
                                            <Download size={18} />
                                        </a>
                                        {user.id === file.uploader_id && (
                                            <button onClick={() => handleDelete(file.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Notes;
