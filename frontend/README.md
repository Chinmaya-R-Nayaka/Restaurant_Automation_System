# Frontend - Restaurant Automation System

This is the frontend client for the Restaurant Automation System (RAS). It is a Single Page Application (SPA) built with React, Vite, and Tailwind CSS.

## Implemented Frontend Features

Currently, **Module 1 (Authentication)** and **Module 2 (Menu Management)** are fully implemented:

1. **Landing Page**: Premium restaurant-themed welcome screen.
2. **Login / Signup**: User onboarding and authentication forms.
3. **Authentication State**: Protected routing and current user session management.
4. **Logout**: Secure session termination.
5. **Menu Management**:
   - **Menu Page**: Central dashboard for viewing the restaurant menu.
   - **Menu Item Listing**: Interactive `MenuCard` displaying item code, category, price, and availability.
   - **Add Menu Item**: Controlled `AddMenuItemModal` for creating new dishes.
   - **Edit Menu Item**: `EditMenuItemModal` for updating item details and category.
   - **Update Price**: Dedicated `PriceUpdateForm` for rapid pricing adjustments.
   - **Delete Item**: In-line deletion handled through the MenuPage.
   - **State Handling**: Comprehensive loading states, error boundaries, and visual availability indicators (Available vs Unavailable).

## UI Design System

### Color Palette
The frontend leverages a dark, premium, restaurant-oriented aesthetic using deep backgrounds and warm gold/cream accents.

| Role | Color | Usage |
|------|-------|-------|
| Primary Background | `#1c1512` | Main page background (deep dark brown/black) |
| Secondary Background | `#f4ebdc` (Low Opacity) | Transparent overlays (`bg-[#f4ebdc]/[0.05]`) for cards and sections |
| Primary Accent | `#c6a15b` | Highlights, gradients, logos, and primary buttons |
| Primary Button Text | `#2a2118` | Dark text on primary accent buttons |
| Primary Text | `#f4ebdc` | Main headings and body text (warm cream) |
| Secondary Text | `#d9cdb9` / `#8b7e70` | Supporting text, descriptions, and labels |
| Border | `#f4ebdc` (10% Opacity) | Subtle borders around cards and inputs |
| Success / Available | `#7fae8c` | Green tint for "Available" badges (with `#7fae8c]/15` background) |
| Error / Unavailable | `#d98b6f` | Red/Orange tint for "Unavailable" badges (with `#a85c41]/20` background) |

### Typography
- **Headings & Brand**: `Fraunces, Georgia, serif` - Used for logos, large titles, and prices to convey a classic, high-end feel.
- **Body & UI Elements**: `Work Sans, system-ui, sans-serif` - Used for modern, readable data presentation, forms, and general text.

### UI Principles
- **Premium Restaurant Aesthetic**: Deep tones paired with elegant typography.
- **Subtle Visuals**: Uses radial gradients (`rgba(198,161,91,0.10)`) for sophisticated backgrounds without being overpowering.
- **Interactive Feedback**: Smooth transitions (`duration-300`, `hover:-translate-y-1`) and hover border accents (`hover:border-[#c6a15b]/40`) on interactive cards.
- **Consistent Styling**: Rounded borders (`rounded-[16px]`, `rounded-[9px]`) for a soft, modern feel.

## Frontend Workflow

**Landing Page → Authentication (Login/Signup) → Authenticated User → Menu Management Dashboard**

From the Menu Dashboard:
**Fetch Menu Items → View Grid → Select Action (Add/Edit/Delete/Price) → Backend API (Axios) → Database → Updated UI via React State**

## API Integration

The frontend communicates with the backend via Axios with `withCredentials: true` to support HTTP-only cookies.

| Method | Endpoint | Frontend Usage |
|--------|----------|----------------|
| **POST** | `/api/v1/auth/login` | User login authentication |
| **POST** | `/api/v1/auth/register` | User account creation |
| **GET** | `/api/v1/menu-items` | Fetch all menu items for the dashboard |
| **POST** | `/api/v1/menu-items` | Add a new menu item |
| **PATCH**| `/api/v1/menu-items/:id` | Update general menu item details |
| **PATCH**| `/api/v1/menu-items/:id/price` | Update specific item price |
| **DELETE**| `/api/v1/menu-items/:id` | Remove a menu item |

## Folder Structure

```text
frontend/
├── public/               
├── src/
│   ├── api/              
│   │   └── axios.js      # Configured Axios client
│   ├── components/       
│   │   └── menu/         # Menu Management UI
│   │       ├── AddMenuItemModal.jsx
│   │       ├── EditMenuItemModal.jsx
│   │       ├── MenuCard.jsx
│   │       └── PriceUpdateForm.jsx
│   ├── pages/            
│   │   ├── Landing.jsx   
│   │   ├── Login.jsx     
│   │   ├── Register.jsx  
│   │   └── MenuPage.jsx  # Main Menu View
│   ├── App.jsx           # Main routing component
│   ├── main.jsx          
│   └── index.css         # Tailwind configuration & global CSS
├── index.html            
├── vite.config.js        
└── package.json          
```

## Setup Instructions
1. Install dependencies: `npm install`
2. Start the Vite development server: `npm run dev`
3. The application runs at `http://localhost:5173`.
