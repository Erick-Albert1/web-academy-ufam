const {
  firstName,
  checkStockAvailability,
  calculateTotalPrice,
} = require("../../src/utils/validacoes");

describe("firstName", () => {
  it("retorna o primeiro nome de um nome completo com dois nomes", () => {
    expect(firstName("Maria Silva")).toBe("Maria");
  });

  it("retorna o primeiro nome de um nome completo com vários nomes", () => {
    expect(firstName("Maria Clara Souza Lima")).toBe("Maria");
  });

  it("retorna o próprio nome quando não há espaços", () => {
    expect(firstName("Maria")).toBe("Maria");
  });

  it("retorna string vazia quando a entrada é uma string vazia", () => {
    expect(firstName("")).toBe("");
  });

  it("ignora espaços extras no início/fim antes de extrair o primeiro nome", () => {
    expect(firstName("  Maria Silva  ")).toBe("Maria");
  });

  it("retorna string vazia quando a entrada contém apenas espaços", () => {
    expect(firstName("   ")).toBe("");
  });

  it("retorna string vazia quando a entrada é null", () => {
    expect(firstName(null)).toBe("");
  });

  it("retorna string vazia quando a entrada é undefined", () => {
    expect(firstName(undefined)).toBe("");
  });

  it("retorna string vazia quando a entrada não é uma string", () => {
    expect(firstName(123)).toBe("");
  });
});

describe("checkStockAvailability", () => {
  it("retorna true quando a quantidade solicitada está disponível em estoque", () => {
    expect(checkStockAvailability("laptop", 5)).toBe(true);
  });

  it("retorna true quando a quantidade solicitada é exatamente igual ao estoque disponível (limite)", () => {
    expect(checkStockAvailability("headphone", 5)).toBe(true);
  });

  it("retorna false quando a quantidade solicitada excede o estoque disponível", () => {
    expect(checkStockAvailability("headphone", 6)).toBe(false);
  });

  it("retorna false quando o produto está com estoque zerado", () => {
    expect(checkStockAvailability("book", 1)).toBe(false);
  });

  it("retorna false quando o tipo de produto não existe no estoque", () => {
    expect(checkStockAvailability("monitor", 1)).toBe(false);
  });

  it("retorna false quando a quantidade é zero", () => {
    expect(checkStockAvailability("laptop", 0)).toBe(false);
  });

  it("retorna false quando a quantidade é negativa", () => {
    expect(checkStockAvailability("laptop", -1)).toBe(false);
  });

  it("retorna false quando a quantidade é null", () => {
    expect(checkStockAvailability("laptop", null)).toBe(false);
  });

  it("retorna false quando a quantidade é undefined", () => {
    expect(checkStockAvailability("laptop", undefined)).toBe(false);
  });

  it("retorna false quando o productType é vazio", () => {
    expect(checkStockAvailability("", 1)).toBe(false);
  });
});

describe("calculateTotalPrice", () => {
  it("calcula o preço total somando preço * quantidade de cada produto", () => {
    const products = [
      { name: "Product 1", price: 10, quantity: 2 },
      { name: "Product 2", price: 15, quantity: 2 },
      { name: "Product 3", price: 20, quantity: 1 },
    ];
    expect(calculateTotalPrice(products)).toBe(70);
  });

  it("retorna 0 para um array vazio de produtos", () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  it("calcula corretamente para um único produto", () => {
    expect(calculateTotalPrice([{ name: "Product 1", price: 10, quantity: 3 }])).toBe(30);
  });

  it("lida com quantidade igual a zero para um produto", () => {
    const products = [
      { name: "Product 1", price: 10, quantity: 0 },
      { name: "Product 2", price: 15, quantity: 2 },
    ];
    expect(calculateTotalPrice(products)).toBe(30);
  });

  it("retorna 0 quando a entrada não é um array (null)", () => {
    expect(calculateTotalPrice(null)).toBe(0);
  });

  it("retorna 0 quando a entrada não é um array (undefined)", () => {
    expect(calculateTotalPrice(undefined)).toBe(0);
  });
});
