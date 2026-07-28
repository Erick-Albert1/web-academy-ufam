export const SUPPORTED_LANGUAGES = ["pt", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "pt";

const messages = {
  pt: {
    "language.invalid": "Idioma inválido. Idiomas suportados: pt, en.",
    "language.updated": "Idioma alterado com sucesso.",
    "auth.required": "Usuário não autenticado.",
    "auth.forbidden": "Acesso restrito a administradores.",
    "auth.invalidCredentials": "E-mail ou senha inválidos.",
    "auth.emailInUse": "Este e-mail já está em uso.",
    "auth.registered": "Usuário registrado com sucesso.",
    "auth.loggedOut": "Logout realizado com sucesso.",
    "product.notFound": "Produto não encontrado.",
    "user.notFound": "Usuário não encontrado.",
    "cart.empty": "Carrinho de compras vazio.",
    "cart.invalidProduct": "Produto não encontrado para o item do carrinho.",
    "cart.insufficientStock": "Estoque insuficiente para o produto solicitado.",
    "cart.itemAdded": "Item adicionado ao carrinho.",
    "cart.itemRemoved": "Item removido do carrinho.",
    "purchase.completed": "Compra concluída com sucesso.",
    "purchase.notFound": "Compra não encontrada.",
  },
  en: {
    "language.invalid": "Invalid language. Supported languages: pt, en.",
    "language.updated": "Language changed successfully.",
    "auth.required": "User not authenticated.",
    "auth.forbidden": "Access restricted to administrators.",
    "auth.invalidCredentials": "Invalid email or password.",
    "auth.emailInUse": "This email is already in use.",
    "auth.registered": "User registered successfully.",
    "auth.loggedOut": "Logout successful.",
    "product.notFound": "Product not found.",
    "user.notFound": "User not found.",
    "cart.empty": "Shopping cart is empty.",
    "cart.invalidProduct": "Product not found for cart item.",
    "cart.insufficientStock": "Insufficient stock for the requested product.",
    "cart.itemAdded": "Item added to cart.",
    "cart.itemRemoved": "Item removed from cart.",
    "purchase.completed": "Purchase completed successfully.",
    "purchase.notFound": "Purchase not found.",
  },
} satisfies Record<SupportedLanguage, Record<string, string>>;

export type MessageKey = keyof (typeof messages)["pt"];

export const translate = (lang: SupportedLanguage, key: MessageKey): string => {
  return messages[lang][key] ?? key;
};
