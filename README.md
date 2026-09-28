# Restaurant Automation System (RAS)

## Project Overview
The Restaurant Automation System (RAS) is a comprehensive full-stack web application designed to computerize and streamline day-to-day restaurant operations. It aims to eliminate manual bookkeeping and improve operational efficiency by integrating front-of-house operations (sales and billing) with back-of-house operations (inventory and accounting).

The core workflow of the system ensures seamless automation:
**Food Item Sold → Bill Generated → Ingredients Used → Inventory Updated → Stock Level Monitored → Threshold Reached → Purchase Order Generated → Ingredients Received → Invoice Updated**

This end-to-end integration ensures that ingredient tracking is tied directly to sales, and stock replenishment is triggered automatically, simplifying the management of a busy restaurant.

## Key Objectives
- **Computerize Operations**: Automate order processing, billing, and accounting.
- **Inventory Management**: Track ingredient usage in real-time as items are sold.
- **Automated Restocking**: Generate purchase orders automatically when stock levels fall below a defined threshold.
- **Financial Tracking**: Record sales, track expenses, and manage supplier invoices.
- **Centralized Management**: Provide managers with tools to easily update menu items, prices, and view sales reports.

## Core Features

### Currently Implemented Features
Based on the current source code, the foundational **Authentication/User Module** (Module 1) is implemented:
- User Registration and Login.
- JWT-based Authentication.
- Landing Page.

### Planned/Future Features
- **Menu Management**: Add, update, delete menu items and prices.
- **Sales & Billing**: Create orders, calculate totals, and generate bills.
- **Inventory Tracking**: Real-time deduction of ingredients when orders are placed.
- **Purchase Order Generation**: Automatic PO creation when stock is low.
- **Supplier Invoice & Payment**: Enter invoices and process payments to suppliers.
- **Reporting**: Generate sales and expense reports.

## System Architecture
The application follows a modern 3-tier architecture:

**Frontend (React)**
↓
**Backend API (Node.js/Express)**
↓
**Database (MongoDB)**

- **Frontend**: Provides an intuitive user interface for different roles (Cashier, Kitchen In-Charge, Accountant, Manager). It handles routing and API consumption.
- **Backend API**: Serves as the central logic layer. It validates requests, processes business rules (e.g., threshold checking), and communicates with the database.
- **Database**: Stores all persistent data, including users, menu items, orders, ingredients, purchase orders, and invoices.

## System Diagrams
The system's design is guided by several modeling diagrams:

- **Activity Diagram**: Illustrates the parallel workflows of different restaurant staff. It shows the Sales Clerk handling billing, while the Kitchen In-charge manages inventory and purchase orders, the Accountant handles invoices, and the Manager oversees the menu and reports.
- **Use Case Diagram**: Defines the interactions between the actors (Sales Clerk, Kitchen In-Charge, Accountant, Manager) and the core system use cases like "Generate Bill", "Record Ingredient Usage", and "Print Menu Card".
- **State Diagram**: Models the lifecycle states of critical entities, such as how an Order transitions from 'created' to 'billed', or a Purchase Order transitions from 'generated' to 'fulfilled'.
- **Class Diagram**: Outlines the static structure of the database entities (User, MenuItem, Order, OrderItem, Ingredient, StockUsage, PurchaseOrder, SupplierInvoice) and their relationships.
- **Sequence Diagrams**: Details the step-by-step API and system calls for specific processes like "Sales Processing" and "Inventory and Reordering".

## Technology Stack
- **Frontend**: React, React Router DOM, Tailwind CSS, Axios, Vite.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs.

## Repository Structure
```text
project-root/
├── backend/                  # Express.js backend API
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Custom middleware (auth, etc.)
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API route definitions
│   │   ├── utils/            # Helper functions
│   │   ├── validators/       # Input validation logic
│   │   └── server.js         # Backend entry point
│   ├── .env.example          # Environment variables template
│   └── package.json          # Backend dependencies
├── frontend/                 # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/              # Axios API client setup
│   │   ├── pages/            # React page components
│   │   ├── App.jsx           # Main application router
│   │   └── main.jsx          # Frontend entry point
│   ├── index.html            # HTML template
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite bundler configuration
└── README.md                 # Project root documentation
```
