# CampusVault - University Course Portal & Notes Sharing

CampusVault is a comprehensive web application designed for universities to facilitate course management, document sharing, and student collaboration. It provides a secure platform for students to upload, organize, and access academic resources like notes, projects, and assignments.

## Features
- **Role-based Authentication**: Secure access for Students and Administrators.
- **Resource Hub**: Categorized sharing for Notes, Projects, Assignments, and Documents.
- **Cloud Storage**: Seamless integration with AWS S3 for secure and scalable file hosting.
- **Advanced Search**: Search materials by title, category, or uploader.
- **Admin Dashboard**: Comprehensive moderation tools to manage users and resources.
- **Modern UI**: A premium interface featuring glassmorphism, fluid animations, and a sleek dark/light mode experience.

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Axios
- **Backend**: Node.js, Express.js, JWT, Multer
- **Database**: MySQL (AWS RDS Compatible)
- **Cloud & Deployment**: AWS EC2, S3, RDS, PM2, Nginx

## Folder Structure
```
campusvault/
├── backend/            # Node.js Express API
│   ├── src/
│   │   ├── config/     # Database and AWS configurations
│   │   ├── controllers/# Route logic
│   │   ├── middleware/ # Auth and file upload middlewares
│   │   ├── models/     # Database models/queries
│   │   ├── routes/     # API endpoints
│   │   └── utils/      # Helpers (e.g., error handling)
│   └── package.json
├── frontend/           # React Vite application
│   ├── src/
│   │   ├── assets/     # Images and static assets
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React Context (Auth, Theme)
│   │   ├── pages/      # Route pages
│   │   ├── services/   # API call wrappers
│   │   └── styles/     # Global CSS
│   └── package.json
├── DEPLOYMENT.md       # General deployment instructions
├── AWS_SETUP.md        # Detailed AWS setup instructions
└── schema.sql          # Database schema and mock data
```

## Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MySQL
- AWS Account (for S3, optional for local mock)

### 2. Database Setup
Create a MySQL database and run the `schema.sql` file to create the tables.
```bash
mysql -u root -p < schema.sql
```

### 3. Environment Variables
Copy `.env.example` to `.env` in the `backend` directory and configure your settings.

### 4. Running the Backend
```bash
cd backend
npm install
npm run dev
```

### 5. Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

## AWS Deployment Steps
Please refer to `AWS_SETUP.md` for infrastructure provisioning and `DEPLOYMENT.md` for application deployment.

## Future Enhancements
- Real-time chat for student collaboration.
- AI-based document summarization and tagging.
- Automated virus scanning for uploaded files.
- In-browser document preview for PDF/DOCX.

## Contributors
- Project maintained by the CampusVault Team.
