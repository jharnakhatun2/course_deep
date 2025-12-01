# 📚 Course Deep — MERN Stack LMS

> A modern, responsive Learning Management System (LMS) built with the MERN stack. Course Deep supports free & paid courses, event booking, role-based authentication (Admin / Instructor / Student), dynamic reviews & ratings, blog comments, dashboard features, Stripe payments, and more.

---

## 🔗 Live Demos

* **Client (Frontend):** [https://course-deep.vercel.app/](https://course-deep.vercel.app/)
* **Server (Backend):** [https://course-deep-server.vercel.app/](https://course-deep-server.vercel.app/)

---

## ✨ Project Summary

Course Deep is a full-featured LMS where instructors can upload courses, students can enroll in free or paid courses and events, and admins can manage the platform. Key user flows include course submission → admin approval → listing, student enrollments shown in dashboard, course reviews & ratings, blog comments, and secure Stripe payments for paid content.

This repository contains both the frontend (React + Vite + Tailwind) and backend (Node.js + Express + MongoDB). I (Jharna Khatun) developed both the frontend and backend.

---

## 🚀 Key Features

* Role-based authentication (Admin / Instructor / Student)
* Instructor course upload flow with admin approval
* Free & paid course selling
* Free & paid event booking
* Stripe payment integration
* Dynamic reviews & ratings on course single page (authenticated users)
* Blog single page with comments
* Student dashboard: enrolled courses & booked events
* Responsive UI (mobile, tablet, desktop)
* Downloadable certificates/documents (html2canvas, jspdf, jszip)
* Export/print features and QR code generation

---

## 🧭 Tech Stack

**Frontend**

* React 19 + TypeScript
* Vite
* Tailwind CSS (with DaisyUI)
* Redux Toolkit, React-Redux
* React Router v7
* Swiper, react-slick
* Stripe (react-stripe-js)
* lottie-react, react-toastify, react-youtube
* html2canvas, jspdf, jszip, qrcode, file-saver

**Backend**

* Node.js, Express
* MongoDB (native driver)
* JWT authentication, bcryptjs
* Stripe server integration
* cookie-parser, cors, dotenv

---

## 📁 Project Structure (overview)

**Frontend (client)**

```
client/
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ layouts/
│  ├─ redux/
│  ├─ utils/
│  └─ assets/
├─ package.json
└─ vite.config.ts
```

**Backend (server)**

```
server/ (or app/)
├─ app/
│  ├─ controllers/
│  ├─ routes/
│  ├─ middlewares/
│  └─ server.js
├─ package.json
└─ .env
```

---

## ⚙️ Getting Started (Run locally)

> Clone and run both frontend and backend. Below example uses `client` and `server` folders — update paths to match your repo.

1. **Clone repository**

```bash
git clone https://github.com/yourusername/course-deep.git
cd course-deep
```

2. **Frontend (client)**

```bash
cd client
npm install
npm run dev
# or
# pnpm install && pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) (default Vite port) or the port Vite shows.

3. **Backend (server)**

```bash
cd server
npm install
npm start
```

Server default port: `5000` (or as set in `.env`).

---

## 🔐 Environment Variables

Create a `.env` file in the server folder. Example:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
COOKIE_SECRET=your_cookie_secret
FRONTEND_URL=https://course-deep.vercel.app
```

If using Vercel for backend, set these variables in the Vercel project settings.

---

## 🧩 NPM Scripts (examples)

**Frontend (client/package.json)**

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

**Backend (server/package.json)**

```json
{
  "scripts": {
    "start": "node app/server.js",
    "vercel-build": "echo 'No build step needed'"
  }
}
```

---

## 🔒 Authentication & Authorization

* **JWT tokens** are issued at login and stored using secure/HTTP-only cookies.
* **Middleware** protects routes and checks roles (Admin / Instructor / Student).
* Admin verifies & approves instructor-submitted courses before listing.

---

## 💳 Payments

* Stripe is fully integrated for paid courses & events.
* Payment endpoints are handled securely on the backend using Stripe secret key; front-end uses `@stripe/react-stripe-js`.

---

## 🧪 Tests

This project does not include automated tests (yet). Suggested next steps:

* Add unit tests for critical backend routes (Mocha / Jest)
* Add integration tests for payments and enrollments

---

## 📝 Notes & Tips

* Ensure `MONGO_URI` is correctly set and accessible from your deployment host.
* Keep `JWT_SECRET` and `STRIPE_SECRET_KEY` private and never commit `.env`.
* CORS: If deploying frontend & backend on different domains, configure CORS and `FRONTEND_URL` accordingly.

---

## 📦 Dependent Packages

**Frontend highlights**: `react`, `react-dom`, `@reduxjs/toolkit`, `react-router`, `tailwindcss`, `@stripe/react-stripe-js`, `html2canvas`, `jspdf`, `qrcode`, `react-slick`.

**Backend highlights**: `express`, `mongodb`, `jsonwebtoken`, `bcryptjs`, `stripe`, `cookie-parser`, `cors`, `dotenv`.

---

## 👩‍💻 Author

**Jharna Khatun** — MERN Stack Developer (Frontend & Backend)

* Location: Dhaka, Bangladesh
* Contact: add your email or linked profile here

---

## 📜 License

This project is released under the **MIT License**. Update or change as needed.

---

## ✅ Next Improvements (ideas)

* Add automated tests
* Add instructor analytics & earnings reports
* Add course progress tracking & certificates
* Implement video streaming (private CDN or secured S3) for large courses
* Admin activity logs & audit trail

---

If you want this README exported as a `README.md` file in this repo structure, or a second variant with badges and a banner image (SVG/PNG), tell me and I will provide the file content or create it for you.
