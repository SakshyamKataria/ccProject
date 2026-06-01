import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import AdminDashboard from './pages/AdminDashboard';
import Notes from './pages/Notes';
import Projects from './pages/Projects';
import Documents from './pages/Documents';
import AdminUsers from './pages/AdminUsers';
import AdminFiles from './pages/AdminFiles';
import { AuthProvider, AuthContext } from './context/AuthContext';
    <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500">This page is under construction.</p>
    </div>
);

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, loading } = useContext(AuthContext);
    
    if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;
    
    if (!user) return <Navigate to="/login" replace />;
    
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to={user.role === 'Admin' ? '/admin' : '/dashboard'} replace />;
    }
    
    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Landing />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        
                        {/* Student Routes */}
                        <Route path="dashboard" element={<ProtectedRoute allowedRole="Student"><Dashboard /></ProtectedRoute>} />
                        <Route path="notes" element={<ProtectedRoute allowedRole="Student"><Notes /></ProtectedRoute>} />
                        <Route path="projects" element={<ProtectedRoute allowedRole="Student"><Projects /></ProtectedRoute>} />
                        <Route path="documents" element={<ProtectedRoute allowedRole="Student"><Documents /></ProtectedRoute>} />
                        <Route path="upload" element={<ProtectedRoute allowedRole="Student"><Upload /></ProtectedRoute>} />

                        {/* Admin Routes */}
                        <Route path="admin" element={<ProtectedRoute allowedRole="Admin"><AdminDashboard /></ProtectedRoute>} />
                        <Route path="admin/users" element={<ProtectedRoute allowedRole="Admin"><AdminUsers /></ProtectedRoute>} />
                        <Route path="admin/files" element={<ProtectedRoute allowedRole="Admin"><AdminFiles /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
