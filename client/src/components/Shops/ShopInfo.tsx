import { Shop } from "@/types/shop.types";
import { theme } from "@/config/theme";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Package,
  ShoppingCart,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

interface ShopInfoProps {
  shop: Shop;
}

export function ShopInfo({ shop }: ShopInfoProps) {
  return (
    <div
      className="rounded-xl shadow-lg p-6"
      style={{
        backgroundColor: theme.colors.background.card,
        borderColor: theme.colors.border.DEFAULT,
        border: "1px solid",
      }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo */}
        <div
          className="w-32 h-32 rounded-xl shadow-lg overflow-hidden bg-gray-100 flex-shrink-0"
          style={{
            borderColor: theme.colors.border.DEFAULT,
            border: "4px solid",
          }}
        >
          {shop.logo ? (
            <img
              src={shop.logo}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🏬
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          <div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: theme.colors.text.primary }}
            >
              {shop.name}
            </h1>
            <p style={{ color: theme.colors.text.secondary }}>
              {shop.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span
                className="font-semibold text-lg"
                style={{ color: theme.colors.text.primary }}
              >
                {shop.rating.toFixed(1)}
              </span>
              <span
                className="text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                Rating
              </span>
            </div>

            {/* Products */}
            <div className="flex items-center gap-2">
              <Package
                className="w-5 h-5"
                style={{ color: theme.colors.primary.DEFAULT }}
              />
              <span
                className="font-semibold text-lg"
                style={{ color: theme.colors.text.primary }}
              >
                {shop.totalProducts}
              </span>
              <span
                className="text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                Products
              </span>
            </div>

            {/* Orders */}
            <div className="flex items-center gap-2">
              <ShoppingCart
                className="w-5 h-5"
                style={{ color: theme.colors.success.DEFAULT }}
              />
              <span
                className="font-semibold text-lg"
                style={{ color: theme.colors.text.primary }}
              >
                {shop.totalOrders}
              </span>
              <span
                className="text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                Orders
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t"
            style={{ borderColor: theme.colors.border.light }}
          >
            <div className="flex items-center gap-2 text-sm">
              <MapPin
                className="w-4 h-4"
                style={{ color: theme.colors.text.tertiary }}
              />
              <span style={{ color: theme.colors.text.secondary }}>
                {shop.address.street}, {shop.address.city}, {shop.address.state}
                , {shop.address.country} - {shop.address.zipCode}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail
                className="w-4 h-4"
                style={{ color: theme.colors.text.tertiary }}
              />
              <a
                href={`mailto:${shop.contact.email}`}
                className="hover:underline"
                style={{ color: theme.colors.primary.DEFAULT }}
              >
                {shop.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone
                className="w-4 h-4"
                style={{ color: theme.colors.text.tertiary }}
              />
              <a
                href={`tel:${shop.contact.phone}`}
                className="hover:underline"
                style={{ color: theme.colors.primary.DEFAULT }}
              >
                {shop.contact.phone}
              </a>
            </div>

            {/* Social Media */}
            {shop.socialMedia && (
              <div className="flex items-center gap-3">
                {shop.socialMedia.facebook && (
                  <a
                    href={shop.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {shop.socialMedia.instagram && (
                  <a
                    href={shop.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {shop.socialMedia.twitter && (
                  <a
                    href={shop.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
