import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/User/Home/index.jsx";
import Contactform from "../pages/User/Contact/index.jsx";
import PublicRoute from "./PublicRoute";
import About from "../pages/User/About/index.jsx";
import Products from "../pages/User/Products./index.jsx";
import Login from "../pages/User/Login/index.jsx";
import Register from "../pages/User/Register/index.jsx";
import UpdatePassword from "../pages/User/Changepassword/index.jsx";
import ManageAccount from "../pages/User/Manageaccount/index.jsx";
import Body from "../components/Home/Body.jsx";
import CartPage from "../pages/User/Cart/index.jsx";
import WishlistPage from "../pages/User/Wishlist/index.jsx";
import AdminRoute from "./AdminROutes.jsx";
import Dashboard from "../pages/Admin/Dashboard.jsx";
import EditProduct from "../pages/Admin/editProductPage.jsx";
import AddProduct from "../pages/Admin/AddProduct.jsx";
import UsersPanel from "../components/Admin/UserPannel.jsx";
import OrdersPanel from "../components/Admin/OrderPannel.jsx";
import Checkout from "../pages/User/CheckoutPage/index.jsx";
import MyOrders from "../pages/User/MyOrder/index.jsx";

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
        <Route path="/change-password" element={<UpdatePassword />} />
        <Route path="/account" element={<ManageAccount />} />
        <Route path="/collections/all" element={<Body />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Route>
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="users" element={<UsersPanel />} />
        <Route path="orders" element={<OrdersPanel />} />
        <Route path="edit/:id" element={<EditProduct />} />
      </Route>
      <Route path="*" element={<p>404 not found</p>} />
    </Routes>
  );
};

export default AppRoutes;
