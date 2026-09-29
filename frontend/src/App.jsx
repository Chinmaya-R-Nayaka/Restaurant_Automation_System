import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MenuPage from "./pages/MenuPage";
import NewOrderPage from './pages/NewOrderPage';
import SalesHistory from './pages/SalesHistory';


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/menu" element={<MenuPage />} />
        <Route path="/orders" element={<NewOrderPage/>}/>
        <Route path="/sales-history" element={<SalesHistory/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;