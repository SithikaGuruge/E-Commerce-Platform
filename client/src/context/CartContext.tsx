import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on init
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1, size?: string) => {
    try {
      setCartItems((prev) => {
        const existingItem = prev.find(
          (item) => item.product._id === product._id && item.selectedSize === size
        );

        if (existingItem) {
          showSuccessToast(`Updated ${product.name} quantity in cart!`);
          return prev.map((item) =>
            item.product._id === product._id && item.selectedSize === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        showSuccessToast(`${product.name} added to cart!`);
        return [...prev, { product, quantity, selectedSize: size }];
      });
    } catch (error) {
      showErrorToast("Failed to add item to cart");
    }
  };

  const removeFromCart = (productId: string) => {
    try {
      setCartItems((prev) => {
        const item = prev.find((item) => item.product._id === productId);
        if (item) {
          showSuccessToast(`${item.product.name} removed from cart`);
        }
        return prev.filter((item) => item.product._id !== productId);
      });
    } catch (error) {
      showErrorToast("Failed to remove item from cart");
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      showSuccessToast("Cart cleared successfully");
    } catch (error) {
      showErrorToast("Failed to clear cart");
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.new_price || item.product.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
