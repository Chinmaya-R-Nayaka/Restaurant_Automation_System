# Restaurant Automation System (RAS)

## Project Overview
The Restaurant Automation System (RAS) is a comprehensive full-stack web application designed to computerize and streamline day-to-day restaurant operations. It aims to eliminate manual bookkeeping and improve operational efficiency by integrating front-of-house operations (sales and billing) with back-of-house operations (inventory and accounting).

## Current Implementation Status

| Module | Status | Description |
|--------|--------|-------------|
| **Authentication/User** | Completed | User registration, login, JWT cookies, and protected routes. |
| **Menu Management** | Completed | Full CRUD operations for menu items, price updates, and availability. |
| **Sales & Billing** | Planned / In Progress | POS interface, bill generation, and order processing. |
| **Inventory** | Planned / In Progress | Ingredient tracking and stock deduction. |
| **Purchase Order** | Planned | Automated low-stock purchase orders. |
| **Supplier Invoice & Payment** | Planned | Invoice entry and supplier accounting. |
| **Reports** | Planned | Sales and expense analytics. |

### Updated System Workflow

The currently implemented application workflow follows this path:
**User → Landing Page → Authentication (Login/Register) → Authenticated Application → Menu Management → Manage Menu Items / Pricing / Availability**

As future modules are developed, this flow will extend into:
**Food Item Sold → Bill Generated → Ingredients Used → Inventory Updated → Stock Level Monitored → Threshold Reached → Purchase Order Generated → Ingredients Received → Invoice Updated**

## Key Objectives
- **Computerize Operations**: Automate order processing, billing, and accounting.
- **Inventory Management**: Track ingredient usage in real-time as items are sold.
- **Automated Restocking**: Generate purchase orders automatically when stock levels fall below a defined threshold.
- **Financial Tracking**: Record sales, track expenses, and manage supplier invoices.
- **Centralized Management**: Provide managers with tools to easily update menu items, prices, and view sales reports.

## Module Architecture
The application follows a modern 3-tier architecture:
**Frontend (React) ↓ Backend API (Node.js/Express) ↓ Database (MongoDB)**

Following the defined project roadmap:
- **M1 Authentication/User** has been completed.
- **M2 Menu Management** has been completed.
- **M3 Sales & Billing** will later consume the `MenuItem` data structured in M2.
- **M4 Inventory** can be developed independently, integrating later with the POS system.
- Modules 5, 6, and 7 will naturally follow the dependency structure.

## Core Features

### Implemented Features
- **User Authentication (Module 1)**: User Registration, Login, JWT-based Authentication (Cookies), Landing Page.
- **Menu Management (Module 2)**: Add, update, delete menu items, modify item prices individually, manage availability status, and view the complete menu card.

### Planned Features
- **Sales & Billing**: Create orders, calculate totals, and generate bills.
- **Inventory Tracking**: Real-time deduction of ingredients when orders are placed.
- **Purchase Order Generation**: Automatic PO creation when stock is low.
- **Supplier Invoice & Payment**: Enter invoices and process payments to suppliers.
- **Reporting**: Generate sales and expense reports.

## System Diagrams
The system's design is guided by several modeling diagrams:
- **Activity Diagram**: Parallel workflows of restaurant staff.
- **Use Case Diagram**: Interactions between actors (Sales Clerk, Kitchen In-Charge, Accountant, Manager) and system use cases.
- **State Diagram**: Lifecycle states of critical entities like Orders and Purchase Orders.
- **Class Diagram**: Static structure of database entities (User, MenuItem, Order, etc.).
- **Sequence Diagrams**: API and system calls for specific processes.

## Technology Stack
- **Frontend**: React 19, React Router DOM, Tailwind CSS v4, Axios, Vite.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs.

## Repository Structure
```text
project-root/
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── controllers/      # Handlers (authControllers.js, menuControllers.js)
│   │   ├── middleware/       # Custom middleware (authMiddleware.js)
│   │   ├── models/           # Mongoose schemas (user.js, menuItem.js)
│   │   ├── routes/           # API routes (auth.js, menu.js)
│   │   ├── utils/            
│   │   ├── validators/       
│   │   └── server.js         # Backend entry point
│   ├── .env.example          
│   └── package.json          
├── frontend/                 # React frontend application
│   ├── public/               
│   ├── src/
│   │   ├── api/              # Axios API client (axios.js)
│   │   ├── components/       # Reusable UI components
│   │   │   └── menu/         # Menu UI (MenuCard, Modals, Forms)
│   │   ├── pages/            # Page views (Landing, Login, Register, MenuPage)
│   │   ├── App.jsx           # Main application router
│   │   ├── index.css         # Tailwind configuration & global styles
│   │   └── main.jsx          # Frontend entry point
│   ├── index.html            
│   ├── package.json          
│   └── vite.config.js        
└── README.md                 # Project root documentation
```
