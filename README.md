# 🚀 HireHub Backend

A backend system for a modern job portal platform where recruiters can post jobs and candidates can apply for them.

Built using Node.js, Express.js, MongoDB, JWT Authentication, and REST APIs.

## ✨ Features

### Authentication
- User Registration
- User Login
- User Logout
- JWT Authentication
- Protected Routes

### Company Management
- Register Company
- View Companies
- Update Company
- Delete Company

### Job Management
- Create Job
- View All Jobs
- View Recruiter Jobs
- Delete Job
- Keyword Search

### Application Management
- Apply for Job
- View Applied Jobs
- View Applicants
- Accept Application
- Reject Application

### Profile Management
- Update Profile
- Add Skills
- Update Bio

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- bcryptjs

### Middleware
- Cookie Parser
- CORS

### Development Tools
- Nodemon
- Postman

## 📂 Folder Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── utils/
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone <your-repository-url>
```

### Move into Project

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file and add:

```env
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=
```

### Run Server

```bash
npm run dev
```

## 🌐 API Base URL

```text
http://localhost:8000/api/v1

## 📌 API Endpoints

### User Routes

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/v1/user/register | Register User |
| POST | /api/v1/user/login | Login User |
| GET | /api/v1/user/profile | Get Profile |
| PUT | /api/v1/user/profile/update | Update Profile |
| GET | /api/v1/user/logout | Logout User |

### Company Routes

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/v1/company/register | Register Company |
| GET | /api/v1/company/get | Get Companies |
| PUT | /api/v1/company/update/:id | Update Company |
| DELETE | /api/v1/company/delete/:id | Delete Company |

### Job Routes

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/v1/job/post | Create Job |
| GET | /api/v1/job/get | Get All Jobs |
| GET | /api/v1/job/getadminjobs | Get Recruiter Jobs |
| DELETE | /api/v1/job/delete/:id | Delete Job |

### Application Routes

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/v1/application/apply/:id | Apply Job |
| GET | /api/v1/application/get | Get Applied Jobs |
| GET | /api/v1/application/applicants/:id | Get Applicants |
| PUT | /api/v1/application/status/:id/update | Update Status |

## 🚀 Future Improvements

- Resume Upload using Cloudinary
- Profile Photo Upload
- Frontend Integration (React.js)
- Admin Dashboard
- Email Notifications
- Advanced Job Filters
- Real-Time Notifications

## 👨‍💻 Author

**Nimish Patel**

- B.Tech @ NIT Raipur
- MERN Stack Developer
- Competitive Programmer


