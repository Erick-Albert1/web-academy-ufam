"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { favoriteApi } from "../services/api";
import { Product } from "../types/product";

export default function Favoritos() {
  const queryClient = useQueryClient();

  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await favoriteApi.get<Product[]>("/favoritos");
      return response.data;
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (id: string) => favoriteApi.delete(`/favoritos/${id}`),
    onSuccess: () => {
      toast.success("Favorito removido!");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      toast.error("Erro ao remover favorito");
    },
  });

  return (
    <main className="container py-4 flex-1">
      <h1 className="mb-4">Favoritos</h1>

      {isLoading && <p>Carregando...</p>}
      {isError && <p>Erro ao carregar os favoritos.</p>}

      {favorites && favorites.length === 0 && <p>Nenhum favorito ainda.</p>}

      {favorites && favorites.length > 0 && (
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFavoriteMutation.mutate(product.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
