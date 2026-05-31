const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/aws');
const path = require('path');
require('dotenv').config();

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_BUCKET_NAME || 'campusvault-storage',
        acl: 'public-read', // If using ACLs, otherwise use bucket policies
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `uploads/${uniqueSuffix}${ext}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.docx', '.doc', '.ppt', '.pptx', '.zip', '.png', '.jpg', '.jpeg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOCX, PPT, ZIP, and Images are allowed.'));
        }
    },
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

module.exports = upload;
