import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Product } from "../types/product";
import { FavoritesContext } from "../contexts/FavoritesContext";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const router = useRouter();
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const isFavorite = favorites.some((favorite) => favorite.id === product.id);

  function goToProductDetails() {
    router.push("/produto/" + product.id);
  }

  function toggleFavorite() {
    if (isFavorite) {
      setFavorites((prev) => prev.filter((favorite) => favorite.id !== product.id));
      toast.success("Produto removido dos favoritos!");
    } else {
      setFavorites((prev) => [...prev, product]);
      toast.success("Produto favoritado!");
    }
  }

  return (
    <div className="card h-100">
      <div
        role="button"
        onClick={goToProductDetails}
        style={{ position: "relative", width: "100%", height: 200 }}
      >
        <Image
          src={product.photos[0]}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="card-img-top"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text fw-bold">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <button
          type="button"
          className="btn btn-primary mt-auto"
          onClick={() => addToCart(product)}
        >
          Adicionar no carrinho
        </button>
        <button
          type="button"
          className={`btn mt-2 ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remover dos favoritos" : "Favoritar"}
        </button>
      </div>
    </div>
  );
}
