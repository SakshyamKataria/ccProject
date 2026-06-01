import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Upload = () => {
    const { token } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/files/categories');
                setCategories(res.data);
                if (res.data.length > 0) setCategoryId(res.data[0].id);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setStatus({ type: 'error', message: 'Please select a file to upload' });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category_id', categoryId);

        setLoading(true);
        setStatus(null);

        try {
            await axios.post('http://localhost:5000/api/files/upload', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` 
                }
            });
            setStatus({ type: 'success', message: 'File uploaded successfully!' });
            // Reset form
            setFile(null);
            setTitle('');
            setDescription('');
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Error uploading file' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Upload File</h1>
                <p className="text-gray-500">Share your notes, projects, and documents with others.</p>
            </div>

            <motion.div 
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {status && (
                    <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                        {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <p className="font-medium">{status.message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer relative">
                        <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => setFile(e.target.files[0])}
                            accept=".pdf,.docx,.doc,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
                        />
                        <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                            <UploadCloud size={32} />
                        </div>
                        <p className="font-bold text-lg mb-1">{file ? file.name : "Click or drag file to this area to upload"}</p>
                        <p className="text-sm text-gray-500 text-center">Support for a single upload. Maximum file size 50MB.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input 
                            type="text" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                            placeholder="e.g. Data Structures Midterm Notes"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea 
                            rows="3"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Briefly describe the contents..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.category_name}</option>
                            ))}
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition mt-4 disabled:opacity-70 flex justify-center items-center"
                    >
                        {loading ? 'Uploading...' : 'Submit File'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Upload;
