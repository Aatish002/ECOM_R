import React from "react";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Scrolltop from "../components/Scrolltop";

const PublicRoute = () => {
  return (
    <>
      <Scrolltop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoute;
