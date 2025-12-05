import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { cartService } from "@/services";
import { useAuth } from "./AuthContext";

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
  syncCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      syncCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  const syncCart = async () => {
    if (!isAuthenticated || isSyncing) return;

    try {
      setIsSyncing(true);
      const response = await cartService.getCart();

      const serverCart: CartItem[] = response.items.map((item) => ({
        product: {
          _id: item.productId,
          name: item.name,
          price: item.price,
          new_price: item.price,
        } as Product,
        quantity: item.quantity,
      }));

      setCartItems(serverCart);

      localStorage.removeItem("cart");
    } catch (error: any) {
      console.error("Failed to sync cart:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = async (
    product: Product,
    quantity: number = 1,
    size?: string
  ) => {
    try {
      if (isAuthenticated) {
        await cartService.addToCart({
          productId: product._id,
          quantity,
          price: product.new_price || product.price || 0,
          name: product.name,
        });

        await syncCart();
        showSuccessToast(`${product.name} added to cart!`);
      } else {
        setCartItems((prev) => {
          const existingItem = prev.find(
            (item) =>
              item.product._id === product._id && item.selectedSize === size
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
      }
    } catch (error) {
      showErrorToast("Failed to add item to cart");
      console.error("Add to cart error:", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (isAuthenticated) {
        await cartService.removeCartItem(productId);

        await syncCart();

        const item = cartItems.find((item) => item.product._id === productId);
        if (item) {
          showSuccessToast(`${item.product.name} removed from cart`);
        }
      } else {
        setCartItems((prev) => {
          const item = prev.find((item) => item.product._id === productId);
          if (item) {
            showSuccessToast(`${item.product.name} removed from cart`);
          }
          return prev.filter((item) => item.product._id !== productId);
        });
      }
    } catch (error) {
      showErrorToast("Failed to remove item from cart");
      console.error("Remove from cart error:", error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      if (isAuthenticated) {
        await cartService.updateCartItem(productId, quantity);

        await syncCart();
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      showErrorToast("Failed to update quantity");
      console.error("Update quantity error:", error);
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartService.clearCart();
        setCartItems([]);
        showSuccessToast("Cart cleared successfully");
      } else {
        setCartItems([]);
        showSuccessToast("Cart cleared successfully");
      }
    } catch (error) {
      showErrorToast("Failed to clear cart");
      console.error("Clear cart error:", error);
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
        syncCart,
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
