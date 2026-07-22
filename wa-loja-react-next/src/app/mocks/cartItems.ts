import { CartItem } from "../types/cart";
import { products } from "./products";

export const cartItems: CartItem[] = [
  {
    product: products[0],
    quantity: 1,
  },
  {
    product: products[2],
    quantity: 2,
  },
  {
    product: products[4],
    quantity: 1,
  },
];
