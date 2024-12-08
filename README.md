# MERN Todo Application

A simple and robust Todo application built with the **MERN stack** (MongoDB, Express, React, Node.js). This project includes user authentication (login and sign-up functionality) and allows users to manage their tasks effectively.

## Features

- User authentication (Sign-up, Login)
- Secure password storage using bcrypt
- Add, edit, delete, and view todos
- Fully responsive design using Tailwind CSS
- RESTful API for backend operations
- Frontend and backend decoupled architecture

## Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend
- **Node.js**: JavaScript runtime for the server.
- **Express.js**: A web application framework for Node.js.

### Database
- **MongoDB**: NoSQL database for storing application data.

### Authentication
- **bcrypt**: For password hashing.
- **JSON Web Tokens (JWT)**: For secure user sessions.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) installed
- [MongoDB](https://www.mongodb.com/) set up locally or via a cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd mern-todo
Install dependencies for both frontend and backend:

bash
Copy code
cd client
npm install
cd ../server
npm install
Set up environment variables:

In the server directory, create a .env file:
env
Copy code
PORT=5000
MONGO_URI=<Your_MongoDB_URI>
JWT_SECRET=<Your_Secret_Key>
Start the application:

Start the backend:

bash
Copy code
cd server
npm start
Start the frontend:

bash
Copy code
cd client
npm start
Open the app in your browser at http://localhost:3000.

Folder Structure
plaintext
Copy code
mern-todo/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components (e.g., Login, Sign Up, Todos)
│   │   ├── App.js         # Main application component
│   │   ├── index.js       # Entry point for React
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point for backend
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
API Endpoints
Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user
Todos
GET /api/todos - Get all todos for a user
POST /api/todos - Add a new todo
PUT /api/todos/:id - Update a todo
DELETE /api/todos/:id - Delete a todo
Screenshots
Add relevant screenshots of your app here (e.g., Login page, Todo list page).

Future Enhancements
Add reminders and notifications for tasks
Implement search and filter functionality for todos
Introduce a priority or category feature for tasks
Enhance security with OAuth or social logins
