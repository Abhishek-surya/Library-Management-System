# Lumina Library Management System 📚

Lumina Library is a modern, full-stack MERN application designed to streamline library operations. It features a sleek dark-themed UI, robust administrative controls, and an advanced search system.

## 🚀 Features

### For Users
- **Browse & Search**: Explore a vast collection of books with advanced filtering by category and genre.
- **Borrowing System**: (In Progress) Users can borrow available books, with automatic due date tracking.
- **Responsive Design**: Premium dark-mode aesthetic built with vanilla CSS.

### For Administrators
- **Full CRUD**: Create, Read, Update, and Delete books directly from the interface.
- **Secure Access**: Protected routes and middleware ensure only authorized admins can modify library data.
- **Data Consistency**: Centralized category and genre management using dropdown selections.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Axios, React Router 7
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: JWT Authentication, Bcrypt.js, custom Admin middleware

## 🚦 Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB account or local installation

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/Abhishek-surya/Library-Management-System.git
cd Library-Management-System
```

Install dependencies for both folders:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 4. Seed Data (Optional)
To populate the library with initial books and an admin user:
```bash
cd backend
node seed.js        # Seed books
node createAdmin.js # Create admin account (admin@lumina.com / adminpassword123)
```

### 5. Run the Application

Start the backend:
```bash
cd backend
npm run dev
```

Start the frontend:
```bash
cd frontend
npm run dev
```

## 📜 License
This project is for educational purposes.
