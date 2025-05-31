// src/layouts/PrivateLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";

const PrivateLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default PrivateLayout;
