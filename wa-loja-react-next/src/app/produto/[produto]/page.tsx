"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../services/api";
import { Product } from "../../types/product";

interface ApiProduct {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  fotos: { titulo: string; src: string }[];
}

export default function ProdutoDetalhe() {
  const params = useParams<{ produto: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", params.produto],
    queryFn: async () => {
      const response = await productsApi.get<ApiProduct>(
        "/produto/" + params.produto
      );
      const apiProduct = response.data;
      const mapped: Product = {
        id: apiProduct.id,
        name: apiProduct.nome,
        price: Number(apiProduct.preco),
        description: apiProduct.descricao,
        photos: apiProduct.fotos.map((foto) => foto.src),
      };
      return mapped;
    },
  });

  return (
    <main className="container py-4 flex-1">
      {isLoading && <p>Carregando...</p>}
      {isError && <p>Erro ao carregar o produto.</p>}

      {product && (
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="row g-2">
              {product.photos.map((photo, index) => (
                <div key={index} className="col-6">
                  <div
                    style={{ position: "relative", width: "100%", height: 200 }}
                  >
                    <Image
                      src={photo}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h1>{product.name}</h1>
            <p className="fs-4 fw-bold">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </main>
  );
}
