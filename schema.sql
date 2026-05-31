-- Database Schema for CampusVault

CREATE DATABASE IF NOT EXISTS campusvault_db;
USE campusvault_db;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Student', 'Admin') DEFAULT 'Student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
);

-- Files Table
CREATE TABLE IF NOT EXISTS Files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    file_url TEXT NOT NULL,
    uploader_id INT,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE SET NULL,
    FOREIGN KEY (uploader_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS ActivityLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Insert Default Categories
INSERT IGNORE INTO Categories (category_name) VALUES 
('Notes'),
('Projects'),
('Resume'),
('Assignments'),
('Lab Manuals'),
('Documents');

-- Insert Sample Admin User (Password: Admin123! hashed with bcrypt salt rounds 10)
-- $2a$10$C8.oB/6M.B/5G8j7.z/JbO3U6v.b/6g9/6j6/7H6j.Jb.Jb.Jb.Jb
-- Note: Replace with actual hashed password during dev
INSERT IGNORE INTO Users (name, email, password, role) VALUES 
('Admin User', 'admin@campusvault.edu', '$2a$10$wT/YtH4r14/7rD.7rD.7rD.7rD.7rD.7rD.7rD.7rD.7rD.7rD', 'Admin');
