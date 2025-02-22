import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = () => {
  const [array, setArray] = useState([]); 

  const handleAddTrainer = (trainer) => {
    setArray((prevArray) => [...prevArray, trainer]);
  };

  return (
    <div>
      <Navbar />
      <Outlet context={{ array, handleAddTrainer,setArray }} /> 
      <Footer />
    </div>
  );
};

export default Layout;
