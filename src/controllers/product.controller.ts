import { Request, Response } from "express";
import { getProducts } from "../services/product.service";

export async function fetchProducts(req: Request, res: Response) {
  const products = await getProducts(req.query);
  res.json(products);
}
