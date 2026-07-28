import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Product } from "../types/product";
import { favoriteApi } from "../services/api";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const router = useRouter();

  function goToProductDetails() {
    router.push("/produto/" + product.id);
  }

  const favoriteMutation = useMutation({
    mutationFn: () => favoriteApi.post("/favoritos", product),
    onSuccess: () => {
      toast.success("Produto favoritado!");
    },
    onError: () => {
      toast.error("Erro");
    },
  });

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
          className="btn btn-outline-danger mt-2"
          onClick={() => favoriteMutation.mutate()}
        >
          Favoritar
        </button>
      </div>
    </div>
  );
}
