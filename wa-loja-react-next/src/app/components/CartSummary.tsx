interface CartSummaryProps {
  totalQuantity: number;
  totalPrice: number;
}

export default function CartSummary({
  totalQuantity,
  totalPrice,
}: CartSummaryProps) {
  return (
    <div className="alert alert-secondary d-flex justify-content-between align-items-center">
      <span>Itens no carrinho: {totalQuantity}</span>
      <span>
        Total:{" "}
        {totalPrice.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </div>
  );
}
