import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import React from "react";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <h1 className="text-lg">Home Page</h1>
      <Footer />
    </div>
  );
}
