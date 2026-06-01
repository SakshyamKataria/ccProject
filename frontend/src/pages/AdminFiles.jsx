import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { File, Trash2, Download } from 'lucide-react';

const AdminFiles = () => {
    const { token } = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFiles();
    }, []);

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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to completely remove this file from AWS S3? This action cannot be undone.")) return;
        try {
            await axios.delete(`http://localhost:5000/api/files/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFiles();
        } catch (error) {
            alert("Error deleting file.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <File className="text-secondary" /> Manage Files
                </h1>
                <p className="text-gray-500 mt-1">View and moderate all files uploaded to AWS S3.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div></div>
            ) : (
                <div className="glass p-6 rounded-2xl overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500">
                                <th className="pb-4 font-medium pl-4">Title</th>
                                <th className="pb-4 font-medium">Category</th>
                                <th className="pb-4 font-medium">Uploader</th>
                                <th className="pb-4 font-medium">Date</th>
                                <th className="pb-4 font-medium text-right pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                    <td className="py-4 pl-4 font-medium max-w-xs truncate" title={file.title}>{file.title}</td>
                                    <td className="py-4 text-gray-500">{file.category_name || 'General'}</td>
                                    <td className="py-4 text-gray-500">{file.uploader_name}</td>
                                    <td className="py-4 text-gray-500">{new Date(file.upload_date).toLocaleDateString()}</td>
                                    <td className="py-4 pr-4 text-right flex justify-end gap-2">
                                        <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="Download">
                                            <Download size={18} />
                                        </a>
                                        <button onClick={() => handleDelete(file.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete from S3">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {files.length === 0 && (
                                <tr><td colSpan="5" className="py-8 text-center text-gray-500">No files found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminFiles;
