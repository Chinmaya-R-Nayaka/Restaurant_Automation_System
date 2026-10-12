
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MenuPage from "./pages/MenuPage";
import NewOrderPage from './pages/NewOrderPage';
import SalesHistory from './pages/SalesHistory';
import InventoryDashboard from './pages/InventoryDashboard';
import PurchaseOrderPage from './pages/PurchaseOrderPage';
import InvoicePage from './pages/InvoicePage';
import ReportsPage from './pages/ReportsPage';

import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import SalesClerkDashboard from './pages/dashboards/SalesClerkDashboard';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>

        <Route element={<ProtectedRoute allowedRoles={['customer', 'sales_clerk', 'manager']}><DashboardLayout/></ProtectedRoute>}>
          <Route path="/customer/dashboard" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard/></ProtectedRoute>}/>
          <Route path="/customer/menu" element={<ProtectedRoute allowedRoles={['customer']}><MenuPage/></ProtectedRoute>}/>

          <Route path="/clerk/dashboard" element={<ProtectedRoute allowedRoles={['sales_clerk']}><SalesClerkDashboard/></ProtectedRoute>}/>
          <Route path="/manager/dashboard" element={<ProtectedRoute allowedRoles={['manager']}><ManagerDashboard/></ProtectedRoute>}/>

          <Route path="/menu" element={<ProtectedRoute allowedRoles={['sales_clerk', 'manager']}><MenuPage/></ProtectedRoute>}/>
          <Route path="/orders" element={<ProtectedRoute allowedRoles={['sales_clerk']}><NewOrderPage/></ProtectedRoute>}/>
          <Route path="/sales-history" element={<ProtectedRoute allowedRoles={['sales_clerk', 'manager']}><SalesHistory/></ProtectedRoute>}/>

          <Route path="/inventory" element={<ProtectedRoute allowedRoles={['sales_clerk', 'manager']}><InventoryDashboard/></ProtectedRoute>}/>
          <Route path="/purchase-orders" element={<ProtectedRoute allowedRoles={['sales_clerk', 'manager']}><PurchaseOrderPage/></ProtectedRoute>}/>
          <Route path="/invoices" element={<ProtectedRoute allowedRoles={['sales_clerk', 'manager']}><InvoicePage/></ProtectedRoute>}/>
          <Route path="/reports" element={<ProtectedRoute allowedRoles={['sales_clerk', 'manager']}><ReportsPage/></ProtectedRoute>}/>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
