# Docspot
DocSpot – MERN Stack Appointment Booking System for Doctors &amp; Patients. Built for internship submission. Includes role-based dashboards, secure login, booking system, and admin panel.

-----------

# 🩺 DocSpot – Seamless Appointment Booking for Health

DocSpot is a full-stack web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** to facilitate easy appointment booking between patients and doctors. It provides a role-based system with secure login and dashboards for Users, Doctors, and Admins.

---

## 🚀 Features

- 👤 User Registration & Login
- 🧑‍⚕️ Doctor Registration with Document Upload
- 🔐 JWT-based Authentication
- 📋 Role-based Dashboard Redirection
- 📅 Appointment Booking by Users
- 👨‍⚕️ Patient Viewing by Doctors
- 🛠 Admin Panel to View & Manage Doctors & Patients
- 🧾 Secure APIs using Express.js
- 🎨 UI with Ant Design, Material UI, Bootstrap

---

## 📌 Project Structure

```
Docspot/
├── Document/             # Project report and documentation
├── Project Files/
│   ├── backend/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── controllers/
│   │   └── server.js
│   ├── frontend/
│   │   └── src/
│   │       ├── pages/
│   │       ├── components/
│   │       └── App.js
│   └── .env
├── Video/                # Demo video of the project
└── README.md
```

---

## 🛠 Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | React.js, Ant Design, Axios |
| Backend     | Node.js, Express.js         |
| Database    | MongoDB                     |
| Auth        | JWT (JSON Web Tokens)       |
| Upload      | Multer                      |
| Styling     | Ant Design, Material UI     |

---

## 🔁 User Flow

```
User/Doctor/Admin
        ↓
   Register/Login
        ↓
  JWT Authentication
        ↓
Role-based Redirect
 ↓          ↓          ↓
User      Doctor     Admin
 ↓          ↓          ↓
Book     View       Manage
Appointment Patients  Users/Doctors
```

---

## 🧪 How to Run Locally

### 1️⃣ Backend Setup

```bash
cd Project\ Files/backend
npm install
# Create a .env file
touch .env
```

`.env` content:

```env
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
```

```bash
npm start
```

---

### 2️⃣ Frontend Setup

```bash
cd Project\ Files/frontend
npm install
npm start
```

---

## 🔐 User Roles

- **User**
  - Registers/Login
  - Books appointments
  - Sees confirmation

- **Doctor**
  - Registers/Login
  - Views patient details of booked appointments

- **Admin**
  - Login only
  - Views all registered doctors and users

