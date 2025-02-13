import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductForm from "./components/ProductForm";
import UserRegister from "./components/UserRegister";
import Login from "./components/Login";
import { useState } from "react";
import SignUp from "./components/SignUp";
import { useEffect } from "react";

const App = () => {
  const [user, setUser] = useState({ isLoggedin: false, name: "Guest" });
  const checkisUserLogin = async () => {
    const resp = await fetch("http://localhost:8000/api/isLoggedIn", {
      credentials: "include"
    });
    const respobj = await resp.json();
    if (resp.status === 200)
      setUser({ isLoggedin: true, email: respobj.email });

  }

  useEffect(() => {
    checkisUserLogin();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user.isLoggedin ? <Home /> : <Navigate to="/signup" />} />
          <Route path="/viewproducts" element={user.isLoggedin ? <ProductsPage /> : <Navigate to="/signup" />} />
          <Route path="/addproducts" element={user.isLoggedin ? <ProductForm /> : <Navigate to="/login" />} />
          <Route path="/signup" element={user.isLoggedin ?<Navigate to="/viewproducts" />: <SignUp />} />
          <Route path="/login" element={user.isLoggedin ?<Navigate to="/viewproducts" />:<Login />} />
          <Route path="/registeruser" element={<UserRegister />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
