import React from "react";
import ShopPage from "./pages/Shop.jsx";
import ShopCategory from "./pages/ShopCategory.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import LoginSignup from "./pages/LoginSignupPage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer.jsx";
import men_bannar from "../src/assets/banner_mens.png";
import women_bannar from "../src/assets/banner_women.png";
import kids_bannar from "../src/assets/banner_kids.png";


function App() {
  return (
 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/men" element={<ShopCategory category="men" banner={men_bannar} />} />
        <Route path="/women" element={<ShopCategory category="women" banner={women_bannar} />} />
        <Route path="/kids" element={<ShopCategory category="kid" banner ={kids_bannar}/>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
