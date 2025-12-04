import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { theme } from "@/config/theme";

export default function Footer() {
  return (
    <footer
      className="text-gray-300 mt-20"
      style={{
        background:
          "linear-gradient(to bottom right, #1f2937, #111827, #1f2937)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: theme.colors.primary.DEFAULT }}
              >
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-extrabold text-white">BUY EASY</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your one-stop destination for quality products at unbeatable
              prices. Shop with confidence and discover amazing deals every day.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 hover:bg-sky-500 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 hover:bg-pink-600 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                  ></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                  ></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/shops"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                  ></span>
                  Shops
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                  ></span>
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                  ></span>
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/categories"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.secondary.DEFAULT }}
                  ></span>
                  All Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.secondary.DEFAULT }}
                  ></span>
                  Special Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/products/type/trending"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.secondary.DEFAULT }}
                  ></span>
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  to="/products/type/new-arrivals"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.secondary.DEFAULT }}
                  ></span>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/products/type/imported"
                  className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full group-hover:w-2 transition-all"
                    style={{ backgroundColor: theme.colors.secondary.DEFAULT }}
                  ></span>
                  Imported
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT + "20",
                  }}
                >
                  <MapPin
                    className="w-5 h-5"
                    style={{ color: theme.colors.primary.DEFAULT }}
                  />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">
                  123 Shopping Street,
                  <br />
                  City Center, SC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT + "20",
                  }}
                >
                  <Phone
                    className="w-5 h-5"
                    style={{ color: theme.colors.primary.DEFAULT }}
                  />
                </div>
                <a
                  href="tel:+1234567890"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT + "20",
                  }}
                >
                  <Mail
                    className="w-5 h-5"
                    style={{ color: theme.colors.primary.DEFAULT }}
                  />
                </div>
                <a
                  href="mailto:support@buyeasy.com"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  support@buyeasy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Buy Easy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors duration-300"
              style={{ color: theme.colors.text.tertiary }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-colors duration-300"
              style={{ color: theme.colors.text.tertiary }}
            >
              Terms of Service
            </Link>
            <Link
              to="/shipping"
              className="hover:text-white transition-colors duration-300"
              style={{ color: theme.colors.text.tertiary }}
            >
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
