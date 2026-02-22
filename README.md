# 🗑️ Seiketsu — Smart Dustbin Locator & Overflow Report System

> *Seiketsu (清潔) — Japanese for "cleanliness"*

Seiketsu is a full-stack web application that helps people locate nearby public dustbins and report overflowing or damaged ones. It doesn't try to change human behavior — it simply removes the friction for people who already want to act responsibly.

🌐 **Live App:** [seiketsuu11.vercel.app](https://seiketsuu11.vercel.app)

---

## 🚩 Problem Statement

Many cleanliness initiatives fail because they focus on changing habits. Seiketsu takes a different approach: if someone wants to dispose of waste properly but can't find a bin, or the nearest one is already overflowing, that's an infrastructure problem — not a behavior problem. This app solves that.

---

## ✨ Features

- 📍 **Interactive Map** — View nearby public dustbins at a glance (OpenStreetMap + Leaflet.js)
- 🛰️ **Auto Location Detection** — GPS-based detection on app open
- 🚨 **Overflow Reporting** — Report full or damaged bins with one tap
- 🛠️ **Admin Dashboard** — View, approve, and manage submitted dustbin requests
- 🏆 **Leaderboard** — Top contributors ranked by activity
- 🔔 **Notifications** — Users receive updates on their submitted reports
- 🔐 **Auth System** — JWT-based register/login with role-based access (user/admin)

---

## 🔄 User Flow

1. User opens the web app
2. Location is detected automatically via GPS
3. Nearest dustbins are shown on the map
4. User disposes of waste or taps "Report" on a full/damaged bin
5. Report is stored and sent to admin for review
6. Admin approves or rejects the request via the Admin Dashboard

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Create React App) |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (M0 Free Tier) |
| Maps | OpenStreetMap + Leaflet.js |
| Auth | JWT (JSON Web Tokens) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render (Free Tier) |

---

## 📁 Project Structure

```
Seiketsu/
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── dustbin.controller.js
│       │   ├── dustbinRequest.controller.js
│       │   ├── notification.controller.js
│       │   ├── stats.controller.js
│       │   └── user.controller.js
│       ├── middleware/
│       │   ├── admin.middleware.js
│       │   ├── auth.middleware.js
│       │   ├── error.middleware.js
│       │   └── validate.middleware.js
│       ├── models/
│       │   ├── Dustbin.js
│       │   ├── DustbinRequest.js
│       │   ├── Notification.js
│       │   └── User.js
│       ├── routes/
│       │   ├── admin.routes.js
│       │   ├── auth.routes.js
│       │   ├── dustbin.routes.js
│       │   ├── dustbinRequest.routes.js
│       │   ├── notification.routes.js
│       │   ├── stats.routes.js
│       │   └── user.routes.js
│       └── utils/
│           └── validators/
│               └── auth.validator.js
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── axios.js
│       ├── auth/
│       │   └── AuthContext.js
│       ├── pages/
│       │   ├── AdminDashboard.jsx / .css
│       │   ├── Dashboard.jsx / .css
│       │   ├── Leaderboard.jsx / .css
│       │   ├── Login.jsx / .css
│       │   ├── MapView.jsx
│       │   └── Register.jsx
│       ├── App.js / App.css
│       └── index.js / index.css
│   └── package.json
├── Documents/
│   └── Smart_Dustbin_Locator_Project.pdf
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/Parusa123/seiketsu1.0v.git
cd seiketsu1.0v

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/frontend
npm install
```

### Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Running Locally

```bash
# Run backend (from backend/ folder)
node server.js

# Run frontend (from frontend/frontend/ folder)
npm start
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [seiketsuu11.vercel.app](https://seiketsuu11.vercel.app) |
| Backend | Render | [seiketsu-backend.onrender.com](https://seiketsu-backend.onrender.com) |
| Database | MongoDB Atlas | M0 Free Cluster (Mumbai) |

> ⚠️ **Note:** The backend is hosted on Render's free tier, which spins down after 15 minutes of inactivity. The first request after inactivity may take up to 50 seconds.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/users` | Get user info |
| GET | `/api/dustbins` | Get all dustbin locations |
| POST | `/api/dustbins` | Add a new dustbin (admin only) |
| GET | `/api/dustbin-requests` | Get all overflow/damage reports |
| POST | `/api/dustbin-requests` | Submit a new report |
| GET | `/api/admin` | Admin overview |
| GET | `/api/stats` | Usage and report statistics |
| GET | `/api/notifications` | Get user notifications |

---

## 🗺️ Roadmap

- [x] Core map view with dustbin markers
- [x] GPS-based location detection
- [x] User authentication (register/login)
- [x] Admin dashboard with request management
- [x] Leaderboard for top contributors
- [x] Notifications system
- [x] Deployed on Vercel + Render + MongoDB Atlas
- [ ] Municipal authority email alerts
- [ ] Upvote system for reports (crowd-verified)
- [ ] PWA support for offline access
- [ ] Photo upload with overflow reports

---

## 💡 Why Seiketsu is Realistic

- Built solo by a single student
- Requires no funding or external volunteers
- Uses free-tier services throughout the stack
- Suitable for portfolios, hackathons, and internship applications

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">Built with 💚 for cleaner communities</p>
