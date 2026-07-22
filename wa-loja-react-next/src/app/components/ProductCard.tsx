import Image from "next/image";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="card h-100">
      <div style={{ position: "relative", width: "100%", height: 200 }}>
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
      </div>
    </div>
  );
}
