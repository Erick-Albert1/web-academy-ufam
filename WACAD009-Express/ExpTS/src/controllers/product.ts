import { Request, Response } from 'express';

const API_URL = 'http://localhost:3355/products';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

async function index(_req: Request, res: Response): Promise<void> {
  const response = await fetch(API_URL);
  const products: Product[] = await response.json();

  res.render('product/index', { products });
}

async function create(req: Request, res: Response): Promise<void> {
  if (req.method === 'GET') {
    res.render('product/create');
    return;
  }

  const { name, price, stock } = req.body;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      price: Number(price),
      stock: Number(stock),
    }),
  });

  res.redirect('/product');
}

async function read(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    res.status(404).send('Produto não encontrado.');
    return;
  }

  const product: Product = await response.json();

  res.render('product/read', { product });
}

async function update(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (req.method === 'GET') {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      res.status(404).send('Produto não encontrado.');
      return;
    }

    const product: Product = await response.json();

    res.render('product/update', { product });
    return;
  }

  const { name, price, stock } = req.body;

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      name,
      price: Number(price),
      stock: Number(stock),
    }),
  });

  res.redirect(`/product/${id}`);
}

async function remove(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

  res.redirect('/product');
}

export default { index, create, read, update, remove };
