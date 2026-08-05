"use client";

import { useFavoritesContext } from "../contexts/FavoritesContext";

export default function Favoritos() {
  const { favorites, removeFavorite, favoritesTotal } = useFavoritesContext();

  return (
    <main className="container py-4 flex-1">
      <h1 className="mb-4">Favoritos</h1>

      {favorites.length === 0 && <p>Nenhum favorito ainda.</p>}

      {favorites.length > 0 && (
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
                    onClick={() => removeFavorite(product.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th colSpan={2}>
                {favoritesTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </th>
            </tr>
          </tfoot>
        </table>
      )}
    </main>
  );
}
