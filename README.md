# TravelEase — Travel & Tourism Management System

[![MERN](https://img.shields.io/badge/Stack-MERN-0ea5e9)](https://github.com/surajgupta924/travel-management)
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A production-ready, full-stack **Travel & Tourism Management** platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a public booking website, a customer portal, and an admin/agent dashboard for managing tours, destinations, hotels, bookings, and inquiries.

**Repository:** [github.com/surajgupta924/travel-management](https://github.com/surajgupta924/travel-management)

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Demo Accounts](#demo-accounts)
- [Deployment Instructions](#deployment-instructions)
- [Security Notes](#security-notes)
- [License](#license)

---

## Project Description

**TravelEase** is an end-to-end travel management solution designed for tourism businesses. Customers can browse tour packages, explore destinations, view hotels, and book trips online. Staff members (agents and admins) manage inventory, bookings, payments, and customer inquiries through a dedicated dashboard with role-based access control.

The application follows REST API principles, JWT authentication, and a modular MVC backend architecture paired with a responsive React frontend.

---

## Features

### Public Website
- Hero search and featured tour packages
- Package listing with filters (category, difficulty, price, search)
- Package detail pages with itinerary, inclusions/exclusions, and reviews
- Destination browsing with detail pages
- Hotel listings with star rating filters
- Public contact/inquiry form

### Customer Portal
- User registration and JWT-based login
- Book tours with travel date and traveler count
- View and cancel bookings
- Profile management and password change
- Submit reviews for completed tours

### Admin / Agent Dashboard
- Analytics dashboard (users, bookings, revenue, top packages)
- CRUD for tour packages, destinations, and hotels
- Booking management (status and payment updates)
- Inquiry management with response workflow
- User management with role assignment (admin only)

### Role-Based Access Control

| Role     | Permissions                                           |
|----------|-------------------------------------------------------|
| Customer | Browse, book, review, manage own profile & bookings   |
| Agent    | Dashboard access, manage packages, bookings, inquiries  |
| Admin    | Full access including user management                 |

---

## Tech Stack

| Layer      | Technologies                                              |
|------------|-----------------------------------------------------------|
| Frontend   | React 18, Vite, React Router, Axios, React Hot Toast    |
| Backend    | Node.js, Express.js, Mongoose                             |
| Database   | MongoDB (local or MongoDB Atlas)                          |
| Auth       | JWT, bcryptjs                                             |
| Validation | express-validator                                         |
| Dev Tools  | Nodemon, Concurrently                                     |

---

## Folder Structure

```
travel-management/
├── backend/
│   ├── controllers/          # Business logic (auth, bookings, packages, etc.)
│   ├── middleware/           # JWT auth, request validation
│   ├── models/               # Mongoose schemas (User, Booking, TourPackage, ...)
│   ├── routes/               # Express route definitions
│   ├── utils/                # Token helper, database seed script
│   ├── .env.example          # Backend environment template
│   ├── server.js             # API entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, Footer, cards, ProtectedRoute
│   │   ├── context/          # AuthContext (global auth state)
│   │   ├── pages/            # Public pages (Home, Packages, Login, ...)
│   │   │   └── dashboard/    # Admin panel pages
│   │   ├── services/         # Axios API client
│   │   ├── App.jsx           # Routes
│   │   ├── main.jsx          # React entry
│   │   └── index.css         # Global styles
│   ├── .env.example          # Frontend environment template
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
├── LICENSE
├── package.json              # Root scripts (dev, build, seed)
└── README.md
```

---

## Installation Guide

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster)
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/surajgupta924/travel-management.git
cd travel-management
```

### 2. Install dependencies

```bash
npm run install-all
```

### 3. Configure environment variables

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend (optional for local dev — Vite proxy is used by default)
cp frontend/.env.example frontend/.env
```

Edit `backend/.env` with your MongoDB URI and a strong JWT secret.

### 4. Seed the database (optional demo data)

```bash
npm run seed
```

### 5. Start development servers

```bash
npm run dev
```

| Service  | URL                            |
|----------|--------------------------------|
| Frontend | http://localhost:3000          |
| Backend  | http://localhost:5000          |
| API      | http://localhost:5000/api      |
| Health   | http://localhost:5000/api/health |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Required | Description                                      | Example                                      |
|----------------|----------|--------------------------------------------------|----------------------------------------------|
| `PORT`         | No       | Server port (default: `5000`)                    | `5000`                                       |
| `NODE_ENV`     | No       | Environment mode                                 | `development` / `production`                 |
| `MONGODB_URI`  | Yes      | MongoDB connection string                        | `mongodb://localhost:27017/travel_tourism`   |
| `JWT_SECRET`   | Yes      | Secret key for signing JWT tokens                | `openssl rand -base64 64`                    |
| `JWT_EXPIRE`   | No       | Token expiration (default: `7d`)                 | `7d`                                         |
| `CLIENT_URL`   | No       | Allowed CORS origin(s), comma-separated          | `http://localhost:3000`                      |

### Frontend (`frontend/.env`)

| Variable       | Required | Description                                      | Example                                      |
|----------------|----------|--------------------------------------------------|----------------------------------------------|
| `VITE_API_URL` | No       | API base URL (empty in dev uses Vite proxy)      | `https://api.example.com/api`                |

> **Never commit `.env` files.** Use `.env.example` as a template only.

---

## API Endpoints

Base URL: `/api`

### Health
| Method | Endpoint       | Access  | Description        |
|--------|----------------|---------|--------------------|
| GET    | `/health`      | Public  | API health check   |

### Authentication
| Method | Endpoint                  | Access        | Description              |
|--------|---------------------------|---------------|--------------------------|
| POST   | `/auth/register`          | Public        | Register new user        |
| POST   | `/auth/login`             | Public        | Login and receive JWT    |
| GET    | `/auth/profile`           | Authenticated | Get current user profile |
| PUT    | `/auth/profile`           | Authenticated | Update profile           |
| PUT    | `/auth/change-password`   | Authenticated | Change password          |
| GET    | `/auth/users`             | Admin         | List all users           |
| PUT    | `/auth/users/:id`         | Admin         | Update user role/status  |
| DELETE | `/auth/users/:id`         | Admin         | Delete user              |

### Destinations
| Method | Endpoint              | Access        | Description           |
|--------|-----------------------|---------------|-----------------------|
| GET    | `/destinations`       | Public        | List destinations     |
| GET    | `/destinations/:id`   | Public        | Get destination       |
| POST   | `/destinations`       | Admin, Agent  | Create destination    |
| PUT    | `/destinations/:id`   | Admin, Agent  | Update destination    |
| DELETE | `/destinations/:id`   | Admin         | Delete destination    |

### Hotels
| Method | Endpoint          | Access        | Description       |
|--------|-------------------|---------------|-------------------|
| GET    | `/hotels`         | Public        | List hotels       |
| GET    | `/hotels/:id`     | Public        | Get hotel         |
| POST   | `/hotels`         | Admin, Agent  | Create hotel      |
| PUT    | `/hotels/:id`     | Admin, Agent  | Update hotel      |
| DELETE | `/hotels/:id`     | Admin         | Delete hotel      |

### Tour Packages
| Method | Endpoint          | Access        | Description              |
|--------|-------------------|---------------|--------------------------|
| GET    | `/packages`       | Public        | List packages            |
| GET    | `/packages/:id`   | Public        | Get package with reviews |
| POST   | `/packages`       | Admin, Agent  | Create package           |
| PUT    | `/packages/:id`     | Admin, Agent  | Update package           |
| DELETE | `/packages/:id`   | Admin         | Delete package           |

### Bookings
| Method | Endpoint                | Access              | Description          |
|--------|-------------------------|---------------------|----------------------|
| GET    | `/bookings`             | Authenticated       | List bookings        |
| GET    | `/bookings/:id`         | Authenticated       | Get booking details  |
| POST   | `/bookings`             | Authenticated       | Create booking       |
| PUT    | `/bookings/:id`         | Admin, Agent        | Update booking       |
| PUT    | `/bookings/:id/cancel`  | Owner or Staff      | Cancel booking       |

### Reviews
| Method | Endpoint          | Access        | Description     |
|--------|-------------------|---------------|-----------------|
| GET    | `/reviews`        | Public        | List reviews    |
| POST   | `/reviews`        | Authenticated | Create review   |
| DELETE | `/reviews/:id`    | Admin         | Delete review   |

### Inquiries
| Method | Endpoint            | Access        | Description         |
|--------|---------------------|---------------|---------------------|
| GET    | `/inquiries`        | Admin, Agent  | List inquiries      |
| POST   | `/inquiries`        | Public        | Submit inquiry      |
| PUT    | `/inquiries/:id`    | Admin, Agent  | Update / respond    |
| DELETE | `/inquiries/:id`    | Admin         | Delete inquiry      |

### Dashboard
| Method | Endpoint            | Access        | Description              |
|--------|---------------------|---------------|--------------------------|
| GET    | `/dashboard/stats`  | Admin, Agent  | Dashboard analytics      |

---

## Demo Accounts

After running `npm run seed`, use these accounts for testing:

| Role     | Email               | Password     |
|----------|---------------------|--------------|
| Admin    | admin@travel.com    | password123  |
| Agent    | agent@travel.com    | password123  |
| Customer | customer@travel.com | password123  |

> Demo passwords are for development only. Change them before production deployment.

---

## Deployment Instructions

### Option A — MongoDB Atlas + Render (recommended for portfolio)

#### 1. MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user with read/write access.
3. Whitelist IP `0.0.0.0/0` (or your host's IP) under Network Access.
4. Copy the connection string and set it as `MONGODB_URI` in your backend environment.

#### 2. Deploy Backend (Render / Railway / Fly.io)

**Render example:**
1. Create a new **Web Service** connected to this GitHub repo.
2. Set **Root Directory** to `backend`.
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add environment variables:

```
NODE_ENV=production
MONGODB_URI=<your-atlas-connection-string>
JWT_SECRET=<strong-random-secret>
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend.onrender.com
```

#### 3. Deploy Frontend (Vercel / Netlify / Render)

**Vercel example:**
1. Import the GitHub repo.
2. Set **Root Directory** to `frontend`.
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. Add environment variable:

```
VITE_API_URL=https://your-backend.onrender.com/api
```

#### 4. Seed production database (one time)

```bash
cd backend
MONGODB_URI=<your-atlas-uri> npm run seed
```

---

### Option B — VPS (Ubuntu)

```bash
# Install Node.js 18+, MongoDB, and PM2
sudo apt update && sudo apt install -y nodejs npm mongodb
sudo npm install -g pm2

# Clone and setup
git clone https://github.com/surajgupta924/travel-management.git
cd travel-management
npm run install-all
cp backend/.env.example backend/.env
# Edit backend/.env with production values

# Build frontend
npm run build

# Start backend with PM2
cd backend && pm2 start server.js --name travel-api
pm2 save && pm2 startup
```

Serve `frontend/dist` with Nginx and proxy `/api` to the backend on port 5000.

---

### Production Checklist

- [ ] Set strong `JWT_SECRET` (e.g. `openssl rand -base64 64`)
- [ ] Use MongoDB Atlas or secured self-hosted MongoDB
- [ ] Set `NODE_ENV=production`
- [ ] Configure `CLIENT_URL` to your frontend domain
- [ ] Set `VITE_API_URL` to your deployed API URL
- [ ] Never commit `.env` files
- [ ] Rotate demo account passwords after seeding
- [ ] Enable HTTPS on both frontend and backend

---

## Security Notes

- All secrets must be stored in environment variables, never in source code.
- `.env` files are excluded via `.gitignore`.
- If credentials were ever exposed, **rotate your MongoDB Atlas password and JWT secret immediately** in the Atlas dashboard and your hosting provider's environment settings.
- JWT tokens expire based on `JWT_EXPIRE` (default 7 days).
- Passwords are hashed with bcrypt before storage.

---

## Available Scripts

| Command              | Description                              |
|----------------------|------------------------------------------|
| `npm run install-all`| Install backend and frontend dependencies|
| `npm run dev`        | Start both servers in development mode   |
| `npm run server`     | Start backend only                       |
| `npm run client`     | Start frontend only                      |
| `npm run build`      | Build frontend for production            |
| `npm run start`      | Start backend in production mode         |
| `npm run seed`       | Seed database with demo data             |
| `npm run preview`    | Preview production frontend build        |

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Suraj Gupta** — [github.com/surajgupta924](https://github.com/surajgupta924)
