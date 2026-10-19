import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

const getProductId = (param: string | string[] | undefined): string | null => {
  if (typeof param === "string" && param.length > 0) {
    return param;
  }

  return null;
};

// Recalculate the product's average rating and total review count.
const updateProductRating = async (productId: string) => {
  const aggregate = await prisma.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { _all: true },
  });

  await prisma.product.update({
    where: { id: productId },
    data: {
      rating: aggregate._avg.rating ?? 0,
      reviewCount: aggregate._count._all,
    },
  });
};

// Validate rating and comment.
const validateReviewInput = (rating: unknown, comment: unknown) => {
  if (
    typeof rating !== "number" ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return "Rating must be an integer between 1 and 5.";
  }

  if (typeof comment !== "string" || !comment.trim()) {
    return "Comment is required.";
  }

  if (comment.trim().length > 2000) {
    return "Comment cannot exceed 2000 characters.";
  }

  return null;
};

// GET /api/products/:productId/reviews
// Public: Get reviews, sorted by latest or top-rated.
export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const productId = getProductId(req.params.productId);

    if (!productId) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }
    const sort = req.query.sort === "top-rated" ? "top-rated" : "latest";

    const product = await prisma.product.findUnique({
      where: { id: String(productId) },
      select: {
        id: true,
        rating: true,
        reviewCount: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy:
        sort === "top-rated"
          ? [{ rating: "desc" }, { createdAt: "desc" }]
          : [{ createdAt: "desc" }],
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      reviews,
      summary: {
        rating: product.rating ?? 0,
        reviewCount: product.reviewCount ?? 0,
      },
    });
  } catch (error) {
    console.error("Get product reviews error:", error);
    return res.status(500).json({
      message: "Failed to fetch product reviews.",
    });
  }
};

// GET /api/products/:productId/reviews/mine
// Authenticated: Get the current user's review for a product.
export const getMyReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const productId = getProductId(req.params.productId);

    if (!productId) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }

    if (!userId) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const review = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });

    return res.status(200).json({ review });
  } catch (error) {
    console.error("Get my review error:", error);
    return res.status(500).json({
      message: "Failed to fetch your review.",
    });
  }
};

// POST /api/products/:productId/reviews
// Authenticated: Create one review per user per product.
export const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const productId = getProductId(req.params.productId);

    if (!productId) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }
    const { rating, comment } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const validationError = validateReviewInput(rating, comment);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment: comment.trim(),
        userId,
        productId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    await updateProductRating(productId);

    return res.status(201).json({
      message: "Review submitted successfully.",
      review,
    });
  } catch (error) {
    // Prisma unique-constraint error: user already reviewed this product.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message:
          "You have already reviewed this product. Edit your existing review instead.",
      });
    }

    console.error("Create review error:", error);
    return res.status(500).json({
      message: "Failed to submit review.",
    });
  }
};

// PUT /api/products/:productId/reviews/mine
// Authenticated: Update the current user's existing review.
export const updateMyReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const productId = getProductId(req.params.productId);

    if (!productId) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }
    const { rating, comment } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const validationError = validateReviewInput(rating, comment);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        message: "You have not reviewed this product yet.",
      });
    }

    const review = await prisma.review.update({
      where: { id: existingReview.id },
      data: {
        rating,
        comment: comment.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    await updateProductRating(productId);

    return res.status(200).json({
      message: "Review updated successfully.",
      review,
    });
  } catch (error) {
    console.error("Update review error:", error);
    return res.status(500).json({
      message: "Failed to update review.",
    });
  }
};

// DELETE /api/products/:productId/reviews/mine
// Authenticated: Delete the current user's review.
export const deleteMyReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const productId = getProductId(req.params.productId);

    if (!productId) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        message: "You have not reviewed this product yet.",
      });
    }

    await prisma.review.delete({
      where: {
        id: existingReview.id,
      },
    });

    await updateProductRating(productId);

    return res.status(200).json({
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    return res.status(500).json({
      message: "Failed to delete review.",
    });
  }
};
