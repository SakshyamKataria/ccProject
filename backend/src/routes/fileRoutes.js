const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// File Upload
router.post('/upload', authenticate, upload.single('file'), fileController.uploadFile);

// Get Files (Public or Authenticated depending on requirements, let's say Authenticated)
router.get('/', authenticate, fileController.getAllFiles);

// Delete File
router.delete('/:id', authenticate, fileController.deleteFile);

// Categories
router.get('/categories', fileController.getCategories);

// Stats
router.get('/stats', authenticate, fileController.getDashboardStats);

module.exports = router;
