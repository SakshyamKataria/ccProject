import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Upload, Users, Shield } from 'lucide-react';

const Landing = () => {
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };
    const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

    return (
        <div className="flex flex-col min-h-[calc(100vh-76px)] items-center justify-center -mt-8 relative">
            {/* Background blur effects */}
            <div className="absolute top-20 -left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 dark:opacity-20 animate-blob"></div>
            <div className="absolute top-20 -right-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 dark:opacity-20 animate-blob animation-delay-2000"></div>

            <motion.div 
                className="text-center max-w-3xl z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Learning</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                    The ultimate university portal to share notes, projects, and documents securely. Collaborate with your peers and excel together.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/register" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1">
                        Get Started for Free
                    </Link>
                    <Link to="/login" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-all transform hover:-translate-y-1">
                        Login
                    </Link>
                </div>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 z-10 w-full max-w-6xl"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {[
                    { title: "Share Notes", desc: "Access high-quality lecture notes.", icon: <BookOpen className="text-primary" size={32} /> },
                    { title: "Upload Projects", desc: "Showcase your lab projects easily.", icon: <Upload className="text-secondary" size={32} /> },
                    { title: "Collaborate", desc: "Work together with classmates.", icon: <Users className="text-pink-500" size={32} /> },
                    { title: "Secure Storage", desc: "Powered by AWS S3 infrastructure.", icon: <Shield className="text-green-500" size={32} /> },
                ].map((feature, idx) => (
                    <motion.div key={idx} variants={item} className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                        <div className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-full shadow-inner">{feature.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Landing;
