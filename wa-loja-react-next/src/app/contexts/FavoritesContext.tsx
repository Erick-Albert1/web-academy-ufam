"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Product } from "../types/product";
import { favoriteApi } from "../services/api";

interface FavoritesContextType {
  favorites: Product[];
  checkIsFavorite: (id: string) => boolean;
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  favoritesTotal: number;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  checkIsFavorite: () => false,
  addFavorite: () => {},
  removeFavorite: () => {},
  favoritesTotal: 0,
});

const FAVORITES_QUERY_KEY = ["favorites"];

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: async () => {
      const response = await favoriteApi.get<Product[]>("/favoritos");
      return response.data;
    },
  });

  const addFavoriteMutation = useMutation({
    mutationFn: (product: Product) => favoriteApi.post("/favoritos", product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
      toast.success("Produto favoritado!");
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (id: string) => favoriteApi.delete(`/favoritos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
      toast.success("Produto removido dos favoritos!");
    },
  });

  function checkIsFavorite(id: string) {
    return favorites.some((favorite) => favorite.id === id);
  }

  function addFavorite(product: Product) {
    addFavoriteMutation.mutate(product);
  }

  function removeFavorite(id: string) {
    removeFavoriteMutation.mutate(id);
  }

  const favoritesTotal = useMemo(
    () => favorites.reduce((total, favorite) => total + favorite.price, 0),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        checkIsFavorite,
        addFavorite,
        removeFavorite,
        favoritesTotal,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  return useContext(FavoritesContext);
}
