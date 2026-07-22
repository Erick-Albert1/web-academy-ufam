import { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function ProductList({ products, addToCart }: ProductListProps) {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-lg-4">
          <ProductCard product={product} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
}
