# Frontend - Restaurant Automation System

This is the frontend client for the Restaurant Automation System (RAS). It is a Single Page Application (SPA) built with React, Vite, and Tailwind CSS.

## Technology Stack
- **Framework**: React 19
- **Bundler**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Folder Structure
```text
frontend/
├── public/               # Static assets
├── src/
│   ├── api/              # Axios configuration and API call functions
│   ├── pages/            # View components for different routes
│   │   ├── Landing.jsx   # Main landing page
│   │   ├── Login.jsx     # User login page
│   │   └── Register.jsx  # User registration page
│   ├── App.jsx           # Main routing component
│   ├── main.jsx          # React DOM rendering entry point
│   └── index.css         # Global styles and Tailwind directives
├── index.html            # Main HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies and scripts
```

## Setup Instructions

1. **Install Dependencies**
   Navigate to the `frontend` directory and install the required npm packages:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Ensure you have a `.env` file if specific frontend environment variables (like API base URLs) are required.
   *(Currently, minimal env configuration is needed).*

3. **Start the Development Server**
   Run the Vite development server:
   ```bash
   npm run dev
   ```
   The application will typically be available at `http://localhost:5173`.

## Current Pages & Routing
The frontend currently implements the foundational authentication flow:
- `/` - Landing Page
- `/login` - Login Page
- `/register` - Registration Page

## Planned Features
Future development will introduce role-based dashboards and interfaces for:
- Cashier POS (Point of Sale) for billing.
- Kitchen/Store In-Charge inventory dashboard.
- Accountant invoice management screen.
- Manager reporting and menu configuration panels.
