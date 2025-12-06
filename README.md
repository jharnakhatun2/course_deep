# 📚 Course Deep — MERN Stack LMS Platform

> **Course Deep** is a modern, full-featured, production-grade Learning Management System (LMS) built using the **MERN stack**. It supports free & paid courses, event booking, role-based authentication (Admin / Instructor / Student), secure Stripe payments, dynamic reviews, blog comments, dashboards, and more. All fully responsive and optimized for real-world usage.



## 🔗 Live Demos & Source Code

* **Live Site:** [https://course-deep.vercel.app/](https://course-deep.vercel.app/)
* **Frontend source code:**  [https://github.com/jharnakhatun2/course_deep](https://github.com/jharnakhatun2/course_deep)
* **Backend source code:**  [https://github.com/jharnakhatun2/course_deep_server](https://github.com/jharnakhatun2/course_deep_server)

## ✨ Project Overview

Course Deep provides a complete workflow for modern e-learning platforms:

* Instructors upload courses → Admin approves → Courses go live
* Students enroll in free or paid courses/events
* Students view enrolled items from their dashboard
* Authenticated users can submit reviews/ratings
* Blog posts support real-time comments
* Stripe handles secure payments for paid content

I ( **Jharna Khatun** ) designed and developed **both frontend and backend** by myself as part of a full MERN-stack production-level project.



## 🚀 Key Features

### 🔐 Authentication & User Roles

* JWT-based secure authentication with HTTP-only cookies
* Admin / Instructor / Student — role-based access
* Protected API routes with middleware validation

### 📚 Course Management

* Instructor uploads courses
* Admin approves or rejects
* Approved courses appear publicly
* Dynamic single-course page with details, video previews & curriculum

### ⭐ Reviews & Ratings

* Authenticated students can submit real reviews & star ratings
* Fully dynamic display and live update

### 📅 Event Booking System

* Free & paid events
* Stripe payment for paid events
* Event listing in user’s dashboard

### 🧾 Blog Features

* Single blog page with comments
* Authenticated comment system

### 👤 Student Dashboard

* View all enrolled courses
* View all booked events
* Download content (PDF/ZIP), certificates, QR codes

### 💳 Payments

* Stripe integrated payment system
* Secure backend payment handling
* Automatic redirects and success handling

### 📱 Fully Responsive UI

* Optimized for all screens (mobile → tablet → desktop)
* Smooth UI interactions using Tailwind, DaisyUI, Swiper, Slick



## 🧭 Tech Stack

### 💻 Frontend

* **React 19 + TypeScript**
* **Vite** for lightning-fast dev & build
* **Tailwind CSS + DaisyUI**
* **Redux Toolkit** for global state
* **React Router v7** for routing
* **Swiper & react-slick** sliders
* **Stripe (react-stripe-js)**
* **lottie-react**, **react-toastify**, **react-youtube**
* PDF tools: **html2canvas**, **jspdf**, **jszip**, **qrcode**, **file-saver**

### 🛠 Backend

* **Node.js + Express**
* **MongoDB (Native Driver)**
* **bcryptjs** password hashing
* **JWT** authentication
* **Stripe** server integration
* **cookie-parser**, **cors**, **dotenv**



## 📁 Project Structure

### Frontend

```
client/
├─ src/
│  ├─ app/
│  ├─ assets/
│  ├─ components/
│  ├─ dashboard/
│  ├─ features/
│  ├─ hook/
│  ├─ pages/
│  └─ utils/
├─ package.json
└─ vite.config.ts
```

### Backend

```
server/
├─ app/
│  ├─ routes/
│  ├─ db.js
│  └─ server.js
├─ package.json
└─ .env
```



## ⚙️ Running Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/course-deep.git
cd course-deep
```

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Visit: **[http://localhost:5173](http://localhost:5173)**

### 3️⃣ Backend Setup

```bash
cd server
npm install
npm start
```

Server default: **[http://localhost:5000](http://localhost:5000)**



## 🔐 Environment Variables (Backend)

Create `.env` inside `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key
COOKIE_SECRET=your_cookie_secret
FRONTEND_URL=https://course-deep.vercel.app
```



## 📦 NPM Scripts

### Frontend

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  }
}
```

### Backend

```json
{
  "scripts": {
    "start": "node app/server.js",
    "vercel-build": "echo 'No build step needed'"
  }
}
```



## 🛡 Security Highlights

* HTTP-only cookies prevent XSS token theft
* CORS configured for frontend domain
* Protected admin routes
* Environment variables hidden via `.env`



## 🚧 Known Limitations

This project is created **to demonstrate my MERN Stack skills**.
It does **not use a license** and is **not intended for reuse or redistribution**.



## 👩‍💻 Author

**Jharna Khatun**
**MERN Stack Developer** — Frontend & Backend
📍 Dhaka, Bangladesh
📧 Email: `jharnakhatun203@gmail.com`



## 🚀 Future Improvements

* Add automated tests (unit + integration)
* Instructor analytics & income report dashboard
* Course progress tracking
* Auto-generated certificates
* Secure video streaming (S3 / Cloudflare)
* Admin activity logs & audit trail



If you'd like, I can also generate:
✅ README badges (build, tech stack, author)
✅ A clean banner / project header (SVG/PNG)
✅ A second “minimal” README version
Just tell me!
