import { prisma } from "../../database/prisma";
import { CartItem } from "../../types/express-session";
import { CartError } from "../../errors/CartError";

const findProduct = (id: string) => {
  return prisma.product.findUnique({ where: { id } });
};

const getProductsForCart = async (cart: CartItem[]) => {
  const productIds = cart.map((item) => item.productId);
  return prisma.product.findMany({ where: { id: { in: productIds } } });
};

const detailCart = async (cart: CartItem[]) => {
  const products = await getProductsForCart(cart);

  return cart.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    product: products.find((product) => product.id === item.productId) ?? null,
  }));
};

const finalize = async (userId: string, cart: CartItem[]) => {
  const products = await getProductsForCart(cart);

  return prisma.$transaction(async (tx) => {
    let total = 0;
    const itemsData = [];

    for (const cartItem of cart) {
      const product = products.find((item) => item.id === cartItem.productId);

      if (!product) {
        throw new CartError("cart.invalidProduct");
      }

      if (product.stockQuantity < cartItem.quantity) {
        throw new CartError("cart.insufficientStock");
      }

      total += Number(product.price) * cartItem.quantity;

      itemsData.push({
        productId: product.id,
        quantity: cartItem.quantity,
        price: product.price,
      });

      await tx.product.update({
        where: { id: product.id },
        data: { stockQuantity: { decrement: cartItem.quantity } },
      });
    }

    return tx.purchase.create({
      data: {
        userId,
        total,
        items: { create: itemsData },
      },
      include: { items: { include: { product: true } } },
    });
  });
};

const index = async (userId: string) => {
  return prisma.purchase.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const read = async (id: string, userId: string) => {
  return prisma.purchase.findFirst({
    where: { id, userId },
    include: { items: { include: { product: true } } },
  });
};

export const compraService = {
  findProduct,
  detailCart,
  finalize,
  index,
  read,
};
