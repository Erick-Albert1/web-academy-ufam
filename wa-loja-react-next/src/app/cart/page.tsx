"use client";

import { useState } from "react";
import { cartItems as mockCartItems } from "../mocks/cartItems";
import CartList from "../components/CartList";
import CartSummary from "../components/CartSummary";

export default function Cart() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  function removeItemFromCart(id: string) {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  }

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="container py-4 flex-1">
      <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
      <CartList cartItems={cartItems} removeItemFromCart={removeItemFromCart} />
    </main>
  );
}
