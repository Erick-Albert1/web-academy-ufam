import fs from "fs";
import path from "path";
import swaggerAutogen from "swagger-autogen";

interface ResourceSpec {
  file: string;
  prefix: string;
}

const resources: ResourceSpec[] = [
  { file: path.join(__dirname, "../resources/auth/auth.router.ts"), prefix: "/auth" },
  { file: path.join(__dirname, "../resources/product/product.router.ts"), prefix: "/products" },
  { file: path.join(__dirname, "../resources/usuario/usuario.router.ts"), prefix: "/usuario" },
  { file: path.join(__dirname, "../resources/compra/compra.router.ts"), prefix: "/compra" },
  { file: path.join(__dirname, "../resources/idioma/idioma.router.ts"), prefix: "/idioma" },
];

const baseDoc = {
  info: {
    title: "API da Loja Virtual",
    version: "1.0.0",
    description:
      "Documentação da API da Loja Virtual implementada durante o Web Academy.",
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http"],
  tags: [
    { name: "Auth", description: "Registro, login e logout de usuários." },
    { name: "Produto", description: "CRUD de produtos." },
    { name: "Usuário", description: "CRUD de usuários (restrito a administradores)." },
    { name: "Compra", description: "Carrinho de compras e finalização de pedidos." },
    { name: "Idioma", description: "Troca de idioma via cookie." },
  ],
};

const outputFile = path.join(__dirname, "../../swagger-output.json");
const tempDir = path.join(__dirname, ".tmp-swagger");

const buildPrefixedPath = (prefix: string, routePath: string) => {
  if (routePath === "/") {
    return prefix;
  }

  return `${prefix}${routePath}`;
};

const generate = async () => {
  fs.mkdirSync(tempDir, { recursive: true });

  const paths: Record<string, object> = {};

  for (const resource of resources) {
    const tempOutputFile = path.join(tempDir, `${path.basename(resource.file)}.json`);
    await swaggerAutogen({ disableLogs: true })(tempOutputFile, [resource.file], baseDoc);

    const partialDoc = JSON.parse(fs.readFileSync(tempOutputFile, "utf-8"));

    for (const [routePath, methods] of Object.entries<object>(partialDoc.paths ?? {})) {
      const prefixedPath = buildPrefixedPath(resource.prefix, routePath);
      paths[prefixedPath] = { ...paths[prefixedPath], ...methods };
    }
  }

  fs.rmSync(tempDir, { recursive: true, force: true });

  const finalDoc = { swagger: "2.0", ...baseDoc, paths };
  fs.writeFileSync(outputFile, JSON.stringify(finalDoc, null, 2));
  console.log("swagger-output.json gerado com sucesso.");
};

generate();
