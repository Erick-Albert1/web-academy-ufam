import { CartItem as CartItemType } from "../types/cart";

interface CartItemProps {
  item: CartItemType;
  removeItemFromCart: (id: string) => void;
}

export default function CartItem({ item, removeItemFromCart }: CartItemProps) {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <div>
        <h5 className="mb-1">{product.name}</h5>
        <p className="mb-1">
          Preço unitário:{" "}
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p className="mb-1">Quantidade: {quantity}</p>
        <p className="mb-0 fw-bold">
          Total:{" "}
          {itemTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => removeItemFromCart(product.id)}
      >
        Remover
      </button>
    </div>
  );
}
