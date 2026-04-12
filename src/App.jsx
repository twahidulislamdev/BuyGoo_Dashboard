import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";
import Category from "./components/pages/Category";
import Orders from "./components/pages/Orders";
import Products from "./components/pages/Products";
import Customer from "./components/pages/Customer";
import Registation from "./components/pages/Registation";
import Login from "./components/pages/Login";
import Settings from "./components/pages/Settings";
import OTPVerification from "./components/pages/OTPVerification";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/registation" element={<Registation />} />
        <Route path="/otpverification" element={<OTPVerification />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
