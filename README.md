# JNTU-GV Directorate of Research & Development (DRD) Portal

This is the official web portal for the Directorate of Research & Development at JNTU-GV, Vizianagaram. The application is a full-stack web solution designed to manage research scholars, notifications, downloads, and provide information about the university's R&D activities.

---

## 🏗️ Architecture

The application is built as a **Monorepo-style** project containing both the Frontend and Backend services.

### 1. Frontend (`/src`)
*   **Technology**: [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript.
*   **Styling**: Tailwind CSS, Shadcn/UI, Lucide Icons.
*   **Features/Pages**:
    *   **Home**: Dynamic dashboard with latest notifications.
    *   **Directorate**: Info about Director, Co-Director, and Staff.
    *   **Research**: Overview of research areas, centers, and scholars.
    *   **Admissions**: Ph.D. program regulations and admission info.
    *   **Downloads**: Repository for forms and guidelines.
    *   **Contact**: Enquiry form and location details.
    *   **Admin Panel**: Secured dashboard for managing content.

### 2. Backend (`/backend`)
*   **Technology**: Node.js, Express.js.
*   **Database**: MySQL.
*   **Authentication**: JWT (JSON Web Tokens) for Admin access.
*   **Storage**: Local file storage (using Multer) for uploads.
*   **API Routes**: Handles data for notifications, scholars, research centers, and file downloads.

---

## 🚀 Installation & Setup Guide

Follow these steps to set up the project locally.

### Prerequisites
*   **Node.js**: v18.0.0 or higher.
*   **MySQL**: Installed and running locally.
*   **Git**: For version control.

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd jntugv-drd
```

### Step 2: Database Setup
1.  Open your MySQL client (Workbench, phpMyAdmin, or Command Line).
2.  Create a new database named `drd-jntugv`.
    ```sql
    CREATE DATABASE drd-jntugv;
    ```
3.  The backend will automatically create the necessary tables (`users`, `notifications`, `downloads`, etc.) when it starts.

### Step 3: Backend Configuration
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend/` directory:
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=drd-jntugv
    JWT_SECRET=complex_secret_key_for_jwt
    ```
    *(Replace `your_mysql_password` with your actual MySQL root password)*.

### Step 4: Frontend Configuration
1.  Navigate back to the root directory:
    ```bash
    cd ..
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  (Optional) The frontend is pre-configured to talk to `http://127.0.0.1:6000`. You can override this in `src/lib/constants.ts` or via `.env.local` if needed, but defaults work out of the box.

---

## ▶️ Running the Application

### Development Mode (Concurrent)
To run both the Frontend (Next.js) and Backend (Express) simultaneously:

```bash
# From the root directory
npm run dev:all
```
*   **Frontend**: Open [http://localhost:3000](http://localhost:3000)
*   **Backend API**: Running at [http://localhost:6000](http://localhost:6000)

### Manual Start
*   **Backend only**: `cd backend && npm run dev`
*   **Frontend only**: `npm run dev`

---

## 📦 Production Build & Deployment

For deploying to a production server (Ubuntu/CentOS):

### 1. Build the Frontend
```bash
npm run build
```
This compiles the Next.js application into the `.next` folder.

### 2. Start Backend (Using PM2)
Use PM2 to keep the backend process alive.
```bash
cd backend
pm2 start server.js --name "drd-backend"
```
*Ensure backend runs on port 5000.*

### 3. Start Frontend (Using PM2)
```bash
cd ..
pm2 start npm --name "drd-frontend" -- start
```
*Next.js typically runs on port 3000.*

### 4. Nginx Reverse Proxy (Recommended)
Configure Nginx to proxy traffic from port 80/443 to port 3000 (Frontend) and `/api` requests to port 5000.

---

## 🛠️ API Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/notifications` | Fetch latest news | No |
| **POST** | `/api/notifications` | Post new notification | **Yes** |
| **GET** | `/api/downloads` | List downloads | No |
| **POST** | `/api/downloads` | Upload file/link | **Yes** |
| **GET** | `/api/centers` | List Research Centers | No |
| **GET** | `/api/scholars` | List PhD Scholars | No |
| **POST** | `/api/auth/login` | Admin Login | No |

---

## 👤 Admin Access
To access the admin panel, navigate to `/admin/login`.
*   **Default Username**: `dr@jntugv.edu.in`
*   **Default Password**: `Director.R&D@123` (Change this immediately after first login).

---

## 📄 License & Copyright
© 2024 JNTU-Gurajada Vizianagaram. All Rights Reserved.
Designed and developed by **Anil Sinthu**. Maintained and managed by the **Digital Monitoring Cell (DMC)**, JNTU-GV, Vizianagaram.

## 📧 Contact & Support
For administrative inquiries or technical assistance, please reach out via the following channels:

*   **Official Correspondence**: [dr@jntugv.edu.in](mailto:dr@jntugv.edu.in)
*  **Technical Support**: [dmc@jntugv.edu.in](mailto:dmc@jntugv.edu.in)
*   **Technical Lead**: [anilsinthu114@gmail.com](mailto:anilsinthu114@gmail.com)

## 👥 Development Team
*   **Project Oversight**: Mr. Anil Wurity (Head of Department)
*   **Lead Software Engineer**: Anil Sinthu

