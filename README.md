# Employee Leave Management System

A full-stack MERN application for managing employee leaves, reimbursements, and administrative roles.

## Features
- **Role-Based Access**: Specialized dashboards for Employees, Managers, and Admins.
- **Leave Management**: Apply for leaves, view status, and manage team requests.
- **Expense Reimbursements**: Submit financial claims for manager approval.
- **Admin Panel**: Manage system users and dynamically update their roles.
- **Modern UI**: Designed with TailwindCSS v4 and Framer Motion for a stunning, responsive experience.

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account (or local MongoDB Database)

## Setup Instructions

### 1. Database Configuration
1. Open the file `backend/.env`.
2. Find the `MONGO_URI` line.
3. Replace `<db_username>` with your MongoDB Atlas database username.
4. Replace `<db_password>` with your MongoDB Atlas database password.
*Example:* `MONGO_URI=mongodb+srv://admin:mySecretPassword123@cluster0...`

### 2. Start the Backend Server
Open a terminal in the root project folder and run:
```bash
cd backend
npm run dev
```
*You should see a message saying "MongoDB Connected" followed by your cluster address.*

### 3. Start the Frontend Application
Open a **new** terminal window in the root project folder and run:
```bash
cd frontend
npm run dev
```
*This will start the Vite frontend server.*

### 4. Access the Application
1. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).
2. **First User Registration**: Click "Get Started" and register an account. Because the database is empty, the first user to register automatically becomes the system **Admin**.
3. Use the Admin Dashboard to create/assign Manager and Employee roles to new accounts.

## Demo Credentials

For project viewers and testing purposes, here are pre-configured accounts you can use to explore different user roles:

### Admin Account
- **Email**: `admin123@gmail.com`
- **Password**: `admin123`
- **Role**: Administrator (Full system access)

### Manager Account
- **Email**: `Manager@gmail.com`
- **Password**: `Manager`
- **Role**: Manager (Can approve/reject leave requests and reimbursements)

### Employee Account
- **Email**: `abcd@gmail.com`
- **Password**: `abcd`
- **Role**: Employee (Can submit leave requests and reimbursement claims)

## Deployment Options

### ✅ GitHub Pages (Frontend Only)
You can deploy the **frontend** to GitHub Pages using the existing GitHub Actions workflow (`.github/workflows/deploy-gh-pages.yml`).

- Visit: `https://<your-github-username>.github.io/LeaveX-Employee-leave-Management`
- This is **frontend only** and will not run the backend API.

### 🚀 Vercel (Full Stack: Frontend + Backend)
To run the full MERN stack (frontend + backend API) with a single public link, deploy the repo to Vercel.

1. Sign in at https://vercel.com and connect your GitHub account.
2. Create a new project and select this repository.
3. When prompted, set the following Environment Variables (from `backend/.env`):
   - `MONGO_URI` (your MongoDB connection string)
   - `JWT_SECRET` (your JWT signing secret)

After deployment, Vercel will provide a public URL (e.g. `https://<project-name>.vercel.app`). That URL will serve the full app (frontend + backend API).

> 💡 Note: GitHub Pages cannot host the backend API because it only serves static assets. Vercel is the recommended option for a full-stack deployment.
