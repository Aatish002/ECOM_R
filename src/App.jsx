import React from "react";
import Navbar from "./components/common/Navbar.jsx";
import Hero from "./components/Home/Hero.jsx";
import Body from "./components/Home/Body.jsx";
import Counter from "./components/Home/Counter.jsx";
import Ref from "./components/Home/ref.jsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
