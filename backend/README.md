# Backend - Restaurant Automation System

This is the backend API for the Restaurant Automation System (RAS), built with Node.js, Express, and MongoDB. It serves as the central data and business logic layer for the application.

## Implemented Modules

### MODULE 1: Authentication/User — COMPLETED
Handles secure JWT-based user registration and authentication, utilizing HTTP-only cookies.

### MODULE 2: Menu Management — COMPLETED
Manages the restaurant's menu catalog, allowing authorized staff to perform full CRUD operations on menu items and dynamically adjust prices.

## Menu Management Implementation

### MenuItem Model
The `MenuItem` schema closely reflects the project's Class Diagram and enforces strict database-level constraints:
- `itemCode` (String): Unique identifier for the item, required, trimmed.
- `itemName` (String): Name of the dish, required.
- `category` (String): Classification of the item, required.
- `price` (Decimal128): Stored securely as a MongoDB decimal to prevent floating-point errors, required, minimum value of 0.
- `isAvailable` (Boolean): Defaults to `true`, easily toggleable when stock runs out.

### Backend Workflow
**Frontend Request (Axios) → Express Router (`/api/v1/menu-items`) → Authentication Middleware (`protect`) → Validation Middleware (`Joi`) → Controller (`menuControllers`) → Mongoose Model (`MenuItem`) → MongoDB → JSON Response**

### Menu Management API

| Method | Endpoint | Purpose | Authentication |
|--------|----------|---------|----------------|
| **GET** | `/api/v1/menu-items` | Fetch all menu items | Required |
| **GET** | `/api/v1/menu-items/:id` | Fetch a single menu item by ID | Required |
| **POST** | `/api/v1/menu-items` | Create a new menu item | Required |
| **PATCH** | `/api/v1/menu-items/:id` | Update general details of an item | Required |
| **PATCH** | `/api/v1/menu-items/:id/price`| Update the specific price of an item | Required |
| **DELETE** | `/api/v1/menu-items/:id` | Remove a menu item entirely | Required |

### Authentication Integration
Menu Management APIs are fully integrated with the completed Authentication system. 
All `/api/v1/menu-items` endpoints are wrapped in the `protect` middleware, ensuring that only authenticated users with valid JWT cookies can access or modify the menu catalog. 

## Folder Structure
```text
backend/
├── src/
│   ├── config/           # Database configuration
│   ├── controllers/      
│   │   ├── authControllers.js
│   │   └── menuControllers.js  # Menu business logic
│   ├── middleware/       
│   │   └── authMiddleware.js   # JWT protection
│   ├── models/           
│   │   ├── user.js
│   │   └── menuItem.js         # Mongoose schema for Menu
│   ├── routes/           
│   │   ├── auth.js
│   │   └── menu.js             # Menu API endpoints
│   ├── utils/            
│   ├── validators/       
│   │   ├── authValidator.js
│   │   └── menuValidator.js    # Joi schemas for Menu inputs
│   └── server.js         # Express app mounting /api/v1 routes
├── .env.example          
└── package.json          
```

## Setup Instructions

1. **Install Dependencies**: Navigate to the `backend` directory and run `npm install`.
2. **Environment Variables**: Create a `.env` file based on `.env.example` (ensure `JWT_SECRET` and `MONGODB_URI` are set).
3. **Start the Server**: 
   - Development mode: `npm run dev`
   - Normal start: `npm start`

## Planned Modules
- **Sales & Billing**: POS interactions and bill processing.
- **Inventory**: Tracking ingredient stock.
- **Purchase Orders**: Handling automated supplier orders.
- **Invoices & Reports**: Supplier payments and analytics tracking.
