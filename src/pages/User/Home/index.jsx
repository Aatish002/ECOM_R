import React from "react";
import Navbar from "../../../components/common/Navbar.jsx";
import Hero from "../../../components/Home/Hero.jsx";
import Counter from "../../../components/Home/Counter.jsx";
import Ref from "../../../components/Home/ref.jsx";
import NewDrops from "../../../components/Home/NewDrops.jsx";
import Body from "../../../components/Home/Body.jsx";
const Home = () => {
  return (
    <div>
      <Hero />
      <NewDrops />

      <Body />
      {/* <Ref /> */}
    </div>
  );
};

export default Home;
