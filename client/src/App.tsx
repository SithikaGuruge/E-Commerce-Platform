import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Offers from "./pages/Offers";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignupPage";
import ProductsByTypePage from "./pages/ProductsByTypePage";
import ShopsPage from "./pages/ShopsPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/shops/:shopId" element={<ShopDetailPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/type/:type" element={<ProductsByTypePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route
            path="/account"
            element={
              <div className="text-2xl font-bold">
                Account Page - Coming Soon
              </div>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
