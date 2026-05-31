# Application Deployment Guide

This document covers how to deploy the CampusVault application onto your AWS EC2 instance.

## Prerequisites
Ensure you have completed all steps in `AWS_SETUP.md` and have your EC2 instance running, along with the RDS and S3 resources.

## STEP 1: Connect to EC2
SSH into your EC2 instance using the downloaded key pair:
```bash
ssh -i "campusvault-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```

## STEP 2: Install Dependencies
Update the server and install Node.js, Nginx, PM2, and Git.
```bash
sudo apt update
sudo apt upgrade -y
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
# Install Nginx and Git
sudo apt install -y nginx git
# Install PM2 globally
sudo npm install -g pm2
```

## STEP 3: Clone Project
```bash
git clone <YOUR_GITHUB_REPO_URL> campusvault
cd campusvault
```

## STEP 4: Configure Environment Variables
Navigate to the backend and configure your `.env` file.
```bash
cd backend
cp .env.example .env
nano .env
```
Fill in all variables (DB credentials, AWS keys, JWT secret).

## STEP 5: Run Backend with PM2
```bash
npm install
pm2 start src/server.js --name "campusvault-api"
pm2 save
pm2 startup
```

## STEP 6: Deploy React Frontend
Navigate to the frontend directory, build the project, and move it to Nginx's serving directory.
```bash
cd ../frontend
# Configure frontend env variables (API URL)
cp .env.example .env
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

## STEP 7: Configure Nginx Reverse Proxy
Configure Nginx to serve the React app on `/` and proxy API requests to the Node.js backend.
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace the content with:
```nginx
server {
    listen 80;
    server_name <YOUR_DOMAIN_OR_IP>;

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Test and restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## STEP 8: Connect Domain (Optional)
1. Point your domain's A record to your EC2 instance's Public IP.
2. Update Nginx configuration with your domain name.
3. Install `certbot` and run it to secure your site with HTTPS.
```bash
sudo apt install python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

Your CampusVault application should now be live!
