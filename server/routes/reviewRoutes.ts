import express from "express";
import auth from "../middleware/auth.js";

import {
  createReview,
  deleteMyReview,
  getMyReview,
  getProductReviews,
  updateMyReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

//Get all reviews for a product, sorted by latest or top-rated.
reviewRouter.get("/:productId/reviews", getProductReviews);

// Get the logged-in user's review for a product.
reviewRouter.get("/:productId/reviews/mine", auth, getMyReview);

// Submit a review for a product.
reviewRouter.post("/:productId/reviews", auth, createReview);

// Edit the logged-in user's existing review.
reviewRouter.put("/:productId/reviews/mine", auth, updateMyReview);

// Protected: Delete the logged-in user's review.
reviewRouter.delete("/:productId/reviews/mine", auth, deleteMyReview);

export default reviewRouter;
