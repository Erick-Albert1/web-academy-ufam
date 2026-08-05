import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import { useFavoritesContext } from "../contexts/FavoritesContext";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const router = useRouter();
  const { checkIsFavorite, addFavorite, removeFavorite } = useFavoritesContext();

  const isFavorite = checkIsFavorite(product.id);

  function goToProductDetails() {
    router.push("/produto/" + product.id);
  }

  function toggleFavorite() {
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
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
