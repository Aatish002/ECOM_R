import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Contactform from "../pages/Contact/index.jsx";
import PublicRoute from "./PublicRoute";
import About from "../pages/About";
import Products from "../pages/Products.";
import Login from "../pages/Login/index.jsx";
import Register from "../pages/Register/index.jsx";
import UpdateData from "../pages/Changeuserdata/index.jsx";
import UpdatePassword from "../pages/Changepassword/index.jsx";
import ManageAccount from "../pages/Manageaccount/index.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contactform />} />
        <Route path="/about" element={<About />} />
        <Route path="product/:id" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-user-name" element={<UpdateData />} />
        <Route path="/change-password" element={<UpdatePassword />} />
        <Route path="/account" element={<ManageAccount />} />
      </Route>

      <Route path="*" element={<p>404 not found</p>} />
    </Routes>
  );
};

export default AppRoutes;
