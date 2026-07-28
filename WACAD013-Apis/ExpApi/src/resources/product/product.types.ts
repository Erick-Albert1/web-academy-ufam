export interface CreateProductDTO {
  name: string;
  price: number;
  stockQuantity: number;
}

export interface UpdateProductDTO {
  name?: string;
  price?: number;
  stockQuantity?: number;
}
