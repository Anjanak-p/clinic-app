#  DentalCare Pro — Clinic Management Web App

A full-stack dental clinic management application built with React, Node.js, Express, and MongoDB.

##  Features

- **Public Pages**: Home, Services, Doctors, Appointment Booking
- **Admin Dashboard**: View & manage all appointments with status updates
- **JWT Authentication**: Secure admin-only access
- **Form Validation**: Client and server-side validation
- **Pagination**: Efficient appointment listing
- **Responsive UI**
- **Docker Support**: One-command setup

##  Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React 18, React Router v6 |
| Styling   | Custom CSS (no Tailwind), CSS Variables |
| Backend   | Node.js, Express 4 |
| Database  | MongoDB + Mongoose |
| Auth      | JSON Web Tokens (JWT) |
| Notifications | react-hot-toast |
| Icons     | react-icons        |
| Docker    | Docker Compose     |

## Project Structure

```
Clinic:.
│   .gitignore
│   docker-compose.yml
│
├───backend
│   │   .dockerignore
│   │   .env
│   │   .env.example
│   │   Dockerfile
│   │   package-lock.json
│   │   package.json
│   │   seed.js
│   │   server.js
│   │
│   ├───config
│   │       db.js
│   │
│   ├───controllers
│   │       appointment.controller.js
│   │       doctor.controller.js
│   │       service.controller.js
│   │
│   ├───middleware
│   │       auth.js
│   │
│   ├───models
│   │       Appointment.js
│   │       Doctor.js
│   │       Service.js
│   │
│   ├───node_modules
│   └───routes
│           appointments.js
│           auth.js
│           doctors.js
│           services.js
│
└───frontend
    │   .dockerignore
    │   Dockerfile
    │   package-lock.json
    │   package.json
    │
    ├───public
    │       index.html
    │
    └───src
        │   App.js
        │   index.css
        │   index.js
        │
        ├───components
        │       Footer.js
        │       Navbar.js
        │
        ├───hooks
        │       useAuth.js
        │
        ├───pages
        │       Admin.js
        │       Appointment.js
        │       Doctors.js
        │       Home.js
        │       Login.js
        │       Services.js
        │
        └───utils
                api.js
```
##  Setup Instructions

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Anjanak-p/clinic-app.git
cd clinic-app

# Start all services
docker-compose up --build

# In a separate terminal, seed the database
docker exec clinic_backend node seed.js
```

App will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

### Option 2: Manual Setup

#### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and settings

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on http://localhost:3000  
Backend runs on http://localhost:5000

---

##  API Endpoints

### Services
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/services` | Get all services | Public |

### Doctors
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/doctors` | Get all doctors | Public |

### Appointments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/appointments` | Book appointment | Public |
| GET | `/api/appointments` | Get all appointments | Admin |
| PATCH | `/api/appointments/:id/status` | Update status | Admin |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/verify` | Verify token |

---

## Admin Access

Default credentials (change in `.env`):
- **Username**: `admin`
- **Password**: `admin123`

Navigate to: http://localhost:3000/admin/login

---

## Database Collections

### Services
```json
{
  "name": "String (required)",
  "description": "String (required)"
}
```

### Doctors
```json
{
  "name": "String (required)",
  "specialization": "String (required)",
  "description": "String (required)",
  "photo": "String (URL)"
}
```

### Appointments
```json
{
  "patientName": "String (required)",
  "email": "String (required)",
  "phone": "String (required)",
  "service": "String (required)",
  "doctor": "String (required)",
  "date": "Date (required)",
  "message": "String",
  "status": "pending | confirmed | cancelled"
}
```

---

## Assumptions Made

1. **Admin is single-user**: A single admin account is configured via environment variables. No user registration is required.
2. **Doctor photos**: External URLs (from pravatar.cc) are used for demo. In production, add file upload (e.g., Multer + S3).
3. **Date validation**: Appointments cannot be booked in the past (client-side). Time slot management (double-booking prevention) is not implemented.
4. **No email notifications**: Appointment confirmation emails are not sent. Toast notifications are used instead.
5. **No real-time updates**: The admin dashboard requires a manual refresh to see new appointments.
6. **The doctors and services data were seeded into the database using the `seed.js` file because the task requirements did not include POST APIs for creating doctors and services in the backend, and the frontend requirements also did not mention functionality for adding them.**

---

##  Bonus Features Implemented

-  JWT Authentication for Admin
-  Toast notifications (react-hot-toast)
-  Pagination (appointments list)
-  Polished UI design with animations
-  Docker setup (docker-compose)
-  Search & filter in admin dashboard





