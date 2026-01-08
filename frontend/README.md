# Full-Stack Task Manager Application

This project is a full-stack web application built as part of the **Full-Stack Developer Intern assignment**. The goal was to design and implement a **secure, scalable, and production-ready web application** within a short timeframe, covering both frontend and backend responsibilities.

The application features **user authentication**, a **protected dashboard**, and **CRUD operations** on a sample entity, while following industry-standard security and architectural practices.

---

## Assignment Overview

- **Frontend**: Built using Next.js with TailwindCSS  
- **Backend**: Built using FastAPI (Python)  
- **Database**: MongoDB Atlas  
- **Authentication**: JWT-based authentication with secure password hashing  
- **Core Focus**: Security, scalability, clean integration between frontend and backend  

---

## Features Implemented

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes (dashboard and profile require authentication)
- Secure logout flow

### Dashboard
- Displays authenticated user information
- Create, read, update, and delete tasks
- Mark tasks as completed
- Search and filter tasks
- User-specific data isolation (users can only access their own tasks)

### Profile Management
- Fetch authenticated user profile
- Update user profile details
- Auth-protected profile routes

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Axios for API communication

### Backend
- FastAPI
- JWT Authentication
- MongoDB Atlas
- bcrypt for password hashing

---

## Project Structure

### Backend Structure
```
app/
├── core/          # Security, JWT utilities
├── db/            # MongoDB connection
├── models/        # Pydantic schemas
├── routes/        # Auth, users, tasks
├── dependencies/  # Authentication guards
└── main.py
```

### Frontend Structure
```
app/
├── login/
├── register/
├── dashboard/
├── profile/
├── lib/           # API and auth helpers
└── layout.tsx
```

The project is structured modularly to allow easy feature expansion and long-term maintainability.

---

## API Endpoints

### Authentication
- `POST /auth/register` – Register a new user  
- `POST /auth/login` – Login and receive JWT token  

### User
- `GET /users/me` – Fetch current user profile  
- `PATCH /users/me` – Update user profile  

### Tasks
- `POST /tasks` – Create a new task  
- `GET /tasks` – Fetch all tasks for authenticated user  
- `PATCH /tasks/{id}` – Mark task as completed  
- `DELETE /tasks/{id}` – Delete a task  

> All routes except `/auth/login` and `/auth/register` require a valid Bearer JWT token.

---

## Security Practices

- Passwords are never stored in plain text
- Password hashing implemented using bcrypt
- JWT tokens validated on every protected API request
- User ownership enforced at the database query level
- Unauthorized access returns appropriate HTTP errors

---

## Scalability & Production Considerations

The application is designed with scalability in mind:

- Modular backend structure allows easy addition of new services
- Clear separation of concerns between routes, models, and core logic
- Stateless JWT authentication suitable for horizontal scaling
- MongoDB allows flexible schema evolution

If extended for production use, the following enhancements could be added:
- Refresh tokens with HTTP-only cookies
- Role-based access control
- Server-side rendering for protected routes
- Indexed database queries and caching
- CI/CD pipelines and containerization (Docker)

---

## Setup Instructions

### Backend
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
npm install
npm run dev
```

---

## Assignment Checklist

- Frontend built with Next.js and TailwindCSS  
- Responsive and clean UI  
- Client-side and server-side form validation  
- JWT-based authentication  
- Protected dashboard routes  
- CRUD-enabled dashboard entity  
- MongoDB integration  
- Secure password handling  
- Scalable and modular codebase  

---

## Author

**Aditya Acharya**  
Full-Stack Developer Intern Candidate  

---

*This project was completed within the given timeframe, prioritizing correctness, security, and scalability over unnecessary complexity.*
