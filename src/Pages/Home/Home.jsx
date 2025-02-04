import React from "react";
import Header from "../Header/Header";
import Homebanner from "./Home-banner";
import Features from "./Our-Features";
import Whychooseus from "./Why-choose-us";
import Footer from "../Footer/Footer";
import Test from "../practice/test";

const Home = () => {
  const title = "Home";
  return (
    <div>
      <Header />
      <Homebanner />
      <Features />
      <Whychooseus />
      <Footer />
   
    </div>
  );
};

export default Home;
