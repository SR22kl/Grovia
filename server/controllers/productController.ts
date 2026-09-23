import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// GET /api/product/flash-deals
export const getFlashDeals = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } },
    orderBy: { originalPrice: "desc" },
  });

  const productsWithDiscount = products.map((p: any) => {
    const discount =
      p.originalPrice && p.price
        ? ((p.originalPrice - p.price) / p.originalPrice) * 100
        : 0;

    return { ...p, discount };
  });

  res.json({ products: productsWithDiscount.slice(0, 8) });
};

// GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, sort, search } = req.query;

  const where: any = {};

  if (category && category !== "all") where.category = category as string;
  if (search) where.name = { contains: search as string, mode: "insensitive" };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const orderBy: any = {};
  if (sort === "price-low") orderBy.price = "asc";
  else if (sort === "price-high") orderBy.price = "desc";
  else orderBy.createdAt = "desc";

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  const productsWithDiscount = products.map((p: any) => {
    const discount =
      p.originalPrice && p.price
        ? ((p.originalPrice - p.price) / p.originalPrice) * 100
        : 0;

    return { ...p, discount };
  });

  res.json({ products: productsWithDiscount });
};

// GET /api/product/:id
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: String(id) },
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const discount =
    product.originalPrice && product.price
      ? ((product.originalPrice - product.price) / product.originalPrice) * 100
      : 0;

  res.json({
    product: {
      ...product,
      discount,
    },
  });
};

// POST /api/product
export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).json({ product });
};

// PUT /api/product/:id
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id: String(id) },
    data: req.body,
  });
  res.json({ product });
};

// DELETE /api/product/:id
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: { id: String(id) },
  });
  res.json({ message: "Product deleted successfully" });
};
