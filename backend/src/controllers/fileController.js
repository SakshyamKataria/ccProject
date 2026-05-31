const db = require('../config/db');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/aws');

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, description, category_id } = req.body;
        const file_url = req.file.location; // Provided by multer-s3

        const [result] = await db.execute(
            'INSERT INTO Files (title, description, category_id, file_url, uploader_id) VALUES (?, ?, ?, ?, ?)',
            [title, description, category_id || null, file_url, req.user.id]
        );

        // Log activity
        await db.execute('INSERT INTO ActivityLogs (user_id, action) VALUES (?, ?)', [req.user.id, `Uploaded file: ${title}`]);

        res.status(201).json({ message: 'File uploaded successfully', fileId: result.insertId, file_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during file upload' });
    }
};

exports.getAllFiles = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = `
            SELECT f.id, f.title, f.description, f.file_url, f.upload_date, 
                   c.category_name, u.name as uploader_name 
            FROM Files f
            LEFT JOIN Categories c ON f.category_id = c.id
            LEFT JOIN Users u ON f.uploader_id = u.id
            WHERE 1=1
        `;
        const queryParams = [];

        if (search) {
            query += ' AND (f.title LIKE ? OR f.description LIKE ?)';
            queryParams.push(`%${search}%`, `%${search}%`);
        }
        if (category) {
            query += ' AND c.category_name = ?';
            queryParams.push(category);
        }

        query += ' ORDER BY f.upload_date DESC';

        const [files] = await db.execute(query, queryParams);
        res.json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching files' });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find file
        const [files] = await db.execute('SELECT * FROM Files WHERE id = ?', [id]);
        if (files.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }
        
        const file = files[0];

        // Check ownership or admin
        if (file.uploader_id !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Not authorized to delete this file' });
        }

        // Delete from S3
        const fileKey = file.file_url.split('.com/')[1]; // Basic extraction, adjust based on actual URL structure
        if (fileKey) {
            const deleteParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileKey,
            };
            await s3Client.send(new DeleteObjectCommand(deleteParams));
        }

        // Delete from DB
        await db.execute('DELETE FROM Files WHERE id = ?', [id]);
        
        // Log activity
        await db.execute('INSERT INTO ActivityLogs (user_id, action) VALUES (?, ?)', [req.user.id, `Deleted file: ${file.title}`]);

        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting file' });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM Categories');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching categories' });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const [totalFiles] = await db.execute('SELECT COUNT(*) as count FROM Files');
        const [totalUsers] = await db.execute('SELECT COUNT(*) as count FROM Users');
        const [recentUploads] = await db.execute(`
            SELECT f.title, f.upload_date, u.name as uploader_name 
            FROM Files f 
            JOIN Users u ON f.uploader_id = u.id 
            ORDER BY f.upload_date DESC LIMIT 5
        `);

        res.json({
            totalFiles: totalFiles[0].count,
            totalUsers: totalUsers[0].count,
            recentUploads
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching stats' });
    }
};
