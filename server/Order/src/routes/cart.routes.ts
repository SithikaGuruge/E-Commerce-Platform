import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const cartController = new CartController();

// All cart routes require authentication
router.use(authMiddleware);

// Cart routes
router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.put("/update/:productId", cartController.updateCartItem);
router.delete("/remove/:productId", cartController.removeCartItem);
router.delete("/clear", cartController.clearCart);
router.post("/checkout", cartController.checkoutCart);

export default router;
