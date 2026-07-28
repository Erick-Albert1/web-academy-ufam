"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "./services/api";
import { Product } from "./types/product";
import CartSummary from "./components/CartSummary";
import ProductList from "./components/ProductList";

interface ApiProduct {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  fotos: { titulo: string; src: string }[];
}

export default function Home() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productsApi.get<ApiProduct[]>("/produto");
      return response.data.map(
        (product): Product => ({
          id: product.id,
          name: product.nome,
          price: Number(product.preco),
          description: product.descricao,
          photos: product.fotos.map((foto) => foto.src),
        })
      );
    },
  });

  function addToCart(product: Product) {
    setTotalQuantity((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
  }

  return (
    <main className="container py-4 flex-1">
      <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
      {isLoading && <p>Carregando...</p>}
      {isError && <p>Erro ao carregar os produtos.</p>}
      {products && <ProductList products={products} addToCart={addToCart} />}
    </main>
  );
}
