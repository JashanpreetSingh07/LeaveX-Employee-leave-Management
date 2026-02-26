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
