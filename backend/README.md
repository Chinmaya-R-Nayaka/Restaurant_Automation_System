# Backend - Restaurant Automation System

This is the backend API for the Restaurant Automation System (RAS), built with Node.js, Express, and MongoDB. It serves as the central data and business logic layer for the application.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Validation**: Joi
- **Utilities**: multer (file uploads), pdfkit (PDF generation), morgan (logging)

## Folder Structure
```text
backend/
├── src/
│   ├── config/           # Configuration files (e.g., database connection)
│   ├── controllers/      # Logic for handling API requests (e.g., authControllers.js)
│   ├── middleware/       # Express middleware (e.g., authentication checks)
│   ├── models/           # Mongoose database schemas (e.g., user.js)
│   ├── routes/           # Express route definitions (e.g., auth.js)
│   ├── utils/            # Utility functions and helpers
│   ├── validators/       # Request body validation schemas
│   └── server.js         # Application entry point
├── .env.example          # Example environment variables
└── package.json          # Project dependencies and scripts
```

## Setup Instructions

1. **Install Dependencies**
   Navigate to the `backend` directory and install the required npm packages:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the `backend` directory. You can use `.env.example` as a reference:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/myapp
   JWT_SECRET=mysecretkey
   JWT_EXPIRES_IN=7d
   GOOGLE_CLIENT_ID=
   NODE_ENV=development
   ```

3. **Start the Server**
   To start the server in development mode (with nodemon):
   ```bash
   npm run dev
   ```
   To start the server normally:
   ```bash
   npm start
   ```

## API Modules

### Implemented Modules
- **Authentication (`/api/auth`)**: User registration, login, and token generation are currently implemented.

### Planned Modules
- **Menu Management**: Endpoints for CRUD operations on menu items.
- **Sales & Billing**: Endpoints to create orders and generate bills.
- **Inventory**: Endpoints to track ingredient stock and usage.
- **Purchase Orders**: Endpoints to handle automated and manual purchase orders.
- **Invoices**: Endpoints for supplier payments.
- **Reports**: Endpoints for generating sales and expense reports.
