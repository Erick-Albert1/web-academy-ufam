import { CartItem as CartItemType } from "../types/cart";
import CartItem from "./CartItem";

interface CartListProps {
  cartItems: CartItemType[];
  removeItemFromCart: (id: string) => void;
}

export default function CartList({ cartItems, removeItemFromCart }: CartListProps) {
  if (cartItems.length === 0) {
    return <p>Seu carrinho está vazio.</p>;
  }

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          removeItemFromCart={removeItemFromCart}
        />
      ))}
    </div>
  );
}
