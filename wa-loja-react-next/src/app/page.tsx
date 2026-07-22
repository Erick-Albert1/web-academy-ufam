"use client";

import { useState } from "react";
import { products } from "./mocks/products";
import { Product } from "./types/product";
import CartSummary from "./components/CartSummary";
import ProductList from "./components/ProductList";

export default function Home() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function addToCart(product: Product) {
    setTotalQuantity((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
  }

  return (
    <main className="container py-4 flex-1">
      <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
      <ProductList products={products} addToCart={addToCart} />
    </main>
  );
}
