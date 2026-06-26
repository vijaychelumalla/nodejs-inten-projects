# Node.js Internship Projects

Welcome to the **Node.js Internship Projects** collection. This folder contains six distinct, modular backend API applications built using Node.js, Express, and MongoDB. Each project focuses on a different aspect of web development, ranging from authentication and role-based access control to file uploads and real-time communication concepts.

---

## 📂 Project Structure

Below is an overview of the projects included in this directory:

```
nodejs-inten-projects/
├── 🔐 Authentication-API/         # Advanced JWT Authentication with OTP and Emails
├── 💬 chat-api/                   # Simple Chat API for messaging
├── ☁️ cloudinary-upload-api/      # File uploading system using Cloudinary & Multer
├── 📁 file-upload-api/            # Local file upload project using Multer & EJS
├── 🛡️ role-based-auth-api/        # Authentication & Role-Based Access Control (RBAC)
└── 👤 user-management-api/        # CRUD User Management API
```

---

## 🛠️ Individual Project Details

### 1. [Authentication-API](file:///d:/nodeJs/nodejs-inten-projects/Authentication-API)
An advanced user authentication API with robust security practices.
* **Key Features:** User registration, login, logout, OTP-based email verification, password reset, and session tracking.
* **Key Tech Stack:** `express`, `mongoose`, `jsonwebtoken` (JWT), `cookie-parser`, `nodemailer` (for sending OTPs), `morgan`.
* **Execution:**
  * Start: `npm start`
  * Dev Mode: `npm run dev`

### 2. [Chat-API](file:///d:/nodeJs/nodejs-inten-projects/chat-api)
A backend utility API for handling user messages.
* **Key Features:** Save and retrieve chat messages from database.
* **Key Tech Stack:** `express`, `mongoose`, `cors`, `dotenv`.
* **Execution:**
  * Dev Mode: `npm run dev`

### 3. [Cloudinary-Upload-API](file:///d:/nodeJs/nodejs-inten-projects/cloudinary-upload-api)
An API that facilitates secure media uploads to Cloudinary.
* **Key Features:** Upload images and files, retrieve metadata, store file URLs in MongoDB, and serve a client interface.
* **Key Tech Stack:** `express`, `mongoose`, `multer`, `cloudinary`, `dotenv`.
* **Execution:**
  * Dev Mode: `npm run dev`

### 4. [File-Upload-API](file:///d:/nodeJs/nodejs-inten-projects/file-upload-api)
A simplified, local file upload web app.
* **Key Features:** Local storage uploads via Multer with a frontend upload page powered by EJS.
* **Key Tech Stack:** `express`, `multer`, `ejs`.
* **Execution:**
  * Start: `node index.js`

### 5. [Role-Based-Auth-API](file:///d:/nodeJs/nodejs-inten-projects/role-based-auth-api)
An authentication API featuring Role-Based Access Control (RBAC).
* **Key Features:** User role assignment (e.g., Admin, Moderator, User) with middleware to restrict route access based on authorization levels.
* **Key Tech Stack:** `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `dotenv`.
* **Execution:**
  * Start: `npm start`
  * Dev Mode: `npm run dev`

### 6. [User-Management-API](file:///d:/nodeJs/nodejs-inten-projects/user-management-api)
A standard CRUD API for managing user profiles.
* **Key Features:** Create, read, update, and delete users from a MongoDB database.
* **Key Tech Stack:** `express`, `mongoose`, `dotenv`.
* **Execution:**
  * Start: `npm start`
  * Dev Mode: `npm run dev`

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16+ recommended)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### Setup Instructions

1. **Clone & Navigate:**
   ```bash
   cd nodejs-inten-projects
   ```

2. **Choose a Project:**
   Navigate into the desired project directory, for example:
   ```bash
   cd Authentication-API
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Variables Configuration:**
   Most projects require environment settings. Create a `.env` file in the chosen project root with your configuration. For example:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/your_db_name
   JWT_SECRET=your_jwt_secret_key
   # Add project-specific variables such as CLOUDINARY_URL or email transport settings if needed
   ```

5. **Run the Application:**
   ```bash
   npm run dev
   ```
