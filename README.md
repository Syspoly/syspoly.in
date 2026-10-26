# System Polygon Pvt. Ltd. (Syspoly) - Production MERN Web Application

A modern, premium, fully responsive IT Services & Software Development company web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js), Vite, Tailwind CSS, Framer Motion, JWT Authentication, and Zod form validation.

---

## 🚀 Tech Stack

### Frontend
- **React.js & Vite**: Fast HMR build pipeline and modern component architecture.
- **React Router v6**: Client-side routing with SEO meta tags via `react-helmet-async`.
- **Tailwind CSS**: Custom tokens (Deep Navy `#0B0F19`, Electric Blue `#2563EB`, Violet accents `#8B5CF6`).
- **Framer Motion**: Smooth animations, viewport counters, and page transitions.
- **Lucide React**: Vector icons.
- **React Hook Form & Zod**: High-performance form validation.
- **Axios**: Centralized HTTP client with automatic Bearer JWT interceptors.

### Backend
- **Node.js & Express.js**: Modular RESTful API architecture.
- **MongoDB & Mongoose**: Document models with indexing and standard validation.
- **MongoMemoryServer Fallback**: Automatic embedded in-memory database fallback if standard MongoDB daemon is unavailable during development.
- **JWT & bcryptjs**: Secure admin authentication and password hashing.
- **Security Middlewares**: `helmet`, `cors`, `express-rate-limit`, and centralized error handling.
- **File Upload Abstraction**: Local disk storage with Cloudinary API compatibility.
- **Email Service Abstraction**: Console logger mock with Nodemailer/SMTP abstraction.

---

## 📁 Project Architecture & Monorepo Structure

```text
syspoly.in/
├── package.json               # Root monorepo scripts
├── .gitignore
├── README.md
├── client/                    # React + Vite Frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── .env.example
│   ├── .env
│   └── src/
│       ├── components/        # Reusable UI (Navbar, Footer, Button, Cards, Modal, Toast, Loader)
│       ├── sections/          # Page sections (Hero, Trust, Stats, Services, Portfolio, Process, CTA)
│       ├── pages/             # Route pages (Home, Services, ServiceDetail, Projects, ProjectDetail, About, Contact, AdminLogin, AdminDashboard, 404)
│       ├── services/          # Axios API service layer
│       ├── index.css          # Tailwind & custom glassmorphism styles
│       ├── App.jsx            # Router switch configuration
│       └── main.jsx           # App entry point
└── server/                    # Express + MongoDB Backend
    ├── server.js              # Server bootstrapper & DB initializer
    ├── app.js                 # Express application & middleware setup
    ├── seed.js                # Database seeder (services, projects, stats, admin)
    ├── package.json
    ├── .env.example
    ├── .env
    ├── config/                # Mongoose connection & MongoMemoryServer fallback
    ├── controllers/           # Auth, Service, Project, Industry, Technology, Testimonial, Contact, Stat controllers
    ├── middleware/            # Auth, Upload, Rate limit, and Centralized Error handler
    ├── models/                # Mongoose Schemas (User, Service, Project, Industry, Technology, Testimonial, Contact, Statistic)
    ├── routes/                # Express API routes (/api/*)
    ├── services/              # Email & Cloudinary upload abstractions
    └── uploads/               # Static image uploads directory
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or higher (Tested on Node v22.14.0)
- **NPM**: v9.x or higher

### 2. Quick Installation

```bash
# Clone the repository and navigate into the root directory
cd syspoly.in

# Install dependencies for both client and server
npm run install:all
```

---

## 🔑 Environment Variables Setup

### Server Environment (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/syspoly_db
JWT_SECRET=syspoly_super_secret_jwt_key_2026_production
JWT_EXPIRE=30d

# Initial Admin Credentials (used during seed)
ADMIN_EMAIL=admin@syspoly.in
ADMIN_PASSWORD=Admin@2026!
ADMIN_NAME=Syspoly Admin

# Image Upload Architecture (Cloudinary placeholder)
CLOUDINARY_CLOUD_NAME=syspoly_cloud
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=mock_cloudinary_secret_key_syspoly

# Email Service Config (SMTP abstraction)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=mock_user
SMTP_PASSWORD=mock_pass
SMTP_FROM=info@syspoly.in
```

### Client Environment (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ⚡ Development & Execution Commands

### 1. Seed Database (Populates Services, Projects, Stats, Admin User)
```bash
# From root directory:
npm run seed
```

### 2. Run Backend Server (Port 5000)
```bash
# From root directory:
npm run dev:server
```

### 3. Run Frontend Development Server (Port 3000)
```bash
# From root directory:
npm run dev:client
```

---

## 🔐 Admin Dashboard & Access Credentials

Navigate to: `http://localhost:3000/admin/login`

- **Default Admin Email**: `admin@syspoly.in`
- **Default Admin Password**: `Admin@2026!`

### Admin Capabilities:
1. **Services Management**: Create, Read, Update, Delete services.
2. **Projects Portfolio Management**: Manage case studies, categories, technologies, and images.
3. **Contact / Enquiry Pipeline**: Track incoming project inquiries from `/contact` and update lead statuses (`New` -> `Contacted` -> `In Progress` -> `Converted` -> `Closed`).
4. **Testimonial Management**: Add, edit, publish/unpublish client reviews.
5. **Statistics Counter Management**: Update homepage metric numbers dynamically without touching source code.

---

## 📡 REST API Documentation Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | System status check |
| `POST` | `/api/auth/login` | Public | Admin JWT Authentication |
| `GET` | `/api/auth/me` | Protected | Get active user profile |
| `GET` | `/api/services` | Public | List active services |
| `GET` | `/api/services/slug/:slug` | Public | Get single service details |
| `POST` | `/api/services` | Protected/Admin | Create new service |
| `PUT` | `/api/services/:id` | Protected/Admin | Update existing service |
| `DELETE` | `/api/services/:id` | Protected/Admin | Delete service |
| `GET` | `/api/projects` | Public | List portfolio projects (with category filter) |
| `GET` | `/api/projects/slug/:slug` | Public | Get project case study |
| `POST` | `/api/projects` | Protected/Admin | Create project |
| `PUT` | `/api/projects/:id` | Protected/Admin | Update project |
| `DELETE` | `/api/projects/:id` | Protected/Admin | Delete project |
| `POST` | `/api/contacts` | Public | Submit new contact/enquiry |
| `GET` | `/api/contacts` | Protected/Admin | View all enquiries |
| `PUT` | `/api/contacts/:id` | Protected/Admin | Update enquiry lead status |
| `DELETE` | `/api/contacts/:id` | Protected/Admin | Delete enquiry |
| `GET` | `/api/statistics` | Public | Get counter statistics |
| `PUT` | `/api/statistics/:id` | Protected/Admin | Update statistic counter |

---

## 🏢 Company Profile Details

- **Company Name**: System Polygon Pvt. Ltd. (Syspoly)
- **Headquarters**: 32, Gajendra Nagar, Shobhawato ki Dhani, Opp. Victorian Palace, Pal Road, Jodhpur, Rajasthan, India
- **Email**: info@syspoly.in
- **Phone**: +91 8561903387
- **Operating Hours**: 24x7 Continuous Operational Support
