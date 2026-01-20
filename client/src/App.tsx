import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { MainLayout } from "./components/MainLayout";
import { ToastProvider } from "./components/Toast/Toast";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Offers from "./pages/Offers";
import Product from "./pages/Product";
import CartPage from "./pages/CartPage";
import LoginSignup from "./pages/LoginSignupPage";
import AccountPage from "./pages/AccountPage";
import ProductsByTypePage from "./pages/ProductsByTypePage";
import ShopsPage from "./pages/ShopsPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider />
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shops" element={<ShopsPage />} />
              <Route path="/shops/:shopId" element={<ShopDetailPage />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/products/type/:type"
                element={<ProductsByTypePage />}
              />
              <Route path="/categories" element={<Categories />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </MainLayout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
