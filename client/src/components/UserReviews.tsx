import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  Pencil,
  Send,
  Star,
  Trash2,
  X,
} from "lucide-react";
import api from "../config/api";
import toast from "react-hot-toast";

interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
  };
}

interface ReviewSummary {
  rating: number;
  reviewCount: number;
}

interface UserReviewsProps {
  productId: string;
  onSummaryChange?: (summary: ReviewSummary) => void;
}

type ReviewSort = "latest" | "top-rated";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = error.response;

    if (
      typeof response === "object" &&
      response !== null &&
      "data" in response
    ) {
      const data = response.data;

      if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        return data.message;
      }
    }
  }

  return fallback;
};

const UserReviews = ({ productId, onSummaryChange }: UserReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [summary, setSummary] = useState<ReviewSummary>({
    rating: 0,
    reviewCount: 0,
  });

  const [sort, setSort] = useState<ReviewSort>("latest");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("auth_token")));
  }, []);

  const fetchReviews = useCallback(async () => {
    const { data } = await api.get(`/products/${productId}/reviews`, {
      params: { sort },
    });

    setReviews(data?.reviews ?? []);

    if (data?.summary) {
      const nextSummary: ReviewSummary = {
        rating: data.summary.rating ?? 0,
        reviewCount: data.summary.reviewCount ?? 0,
      };

      setSummary(nextSummary);
      onSummaryChange?.(nextSummary);
    }
  }, [productId, sort, onSummaryChange]);

  const fetchMyReview = useCallback(async () => {
    if (!localStorage.getItem("auth_token")) {
      setMyReview(null);
      return;
    }

    try {
      const { data } = await api.get(`/products/${productId}/reviews/mine`);

      const review: Review | null = data?.review ?? null;

      setMyReview(review);

      if (!isEditing) {
        setRating(review?.rating ?? 0);
        setComment(review?.comment ?? "");
      }
    } catch (err) {
      console.error("Failed to fetch your review:", err);
    }
  }, [productId, isEditing]);

  const refreshReviews = useCallback(async () => {
    await Promise.all([fetchReviews(), fetchMyReview()]);
  }, [fetchReviews, fetchMyReview]);

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get(`/products/${productId}/reviews`, {
          params: { sort },
        });

        if (!active) return;

        setReviews(data?.reviews ?? []);

        if (data?.summary) {
          const nextSummary: ReviewSummary = {
            rating: data.summary.rating ?? 0,
            reviewCount: data.summary.reviewCount ?? 0,
          };

          setSummary(nextSummary);
          onSummaryChange?.(nextSummary);
        }

        const token = localStorage.getItem("auth_token");
        setIsLoggedIn(Boolean(token));

        if (token) {
          try {
            const { data: mineData } = await api.get(
              `/products/${productId}/reviews/mine`,
            );

            if (!active) return;

            const review: Review | null = mineData?.review ?? null;

            setMyReview(review);

            if (!isEditing) {
              setRating(review?.rating ?? 0);
              setComment(review?.comment ?? "");
            }
          } catch (err) {
            if (active) {
              console.error("Failed to fetch your review:", err);
            }
          }
        } else {
          setMyReview(null);
        }
      } catch (err) {
        if (active) {
          console.error("Failed to load reviews:", err);
          setError(
            getErrorMessage(err, "Unable to load reviews. Please try again."),
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadReviews();

    return () => {
      active = false;
    };
  }, [productId, sort, onSummaryChange, isEditing]);

  const handleEdit = () => {
    if (!myReview) return;

    setRating(myReview.rating);
    setComment(myReview.comment);
    setIsEditing(true);
    setError("");
    setSuccess("");
    setConfirmDelete(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setRating(myReview?.rating ?? 0);
    setComment(myReview?.comment ?? "");
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!isLoggedIn) {
      setError("Please log in to submit a review.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a rating from 1 to 5 stars.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment before submitting.");
      return;
    }

    if (comment.trim().length > 2000) {
      setError("Your comment cannot exceed 2000 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const editingExisting = isEditing && Boolean(myReview);
      const payload = {
        rating,
        comment: comment.trim(),
      };

      if (editingExisting) {
        await api.put(`/products/${productId}/reviews/mine`, payload);
      } else {
        await api.post(`/products/${productId}/reviews`, payload);
      }

      setIsEditing(false);
      setConfirmDelete(false);
      setSuccess(
        editingExisting
          ? "Your review has been updated."
          : "Your review has been submitted.",
      );

      toast.success(
        editingExisting
          ? "Your review has been updated."
          : "Your review has been submitted.",
      );

      await refreshReviews();
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to save your review. Please try again."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      await api.delete(`/products/${productId}/reviews/mine`);

      setMyReview(null);
      setRating(0);
      setComment("");
      setIsEditing(false);
      setConfirmDelete(false);
      setSuccess("Your review has been deleted.");

      toast.success("Review deleted successfully!");

      await refreshReviews();
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to delete your review. Please try again."),
      );
    } finally {
      setDeleting(false);
    }
  };

  const showReviewForm = isLoggedIn && (!myReview || isEditing);

  return (
    <section className="mt-14">
      {/* Section heading */}
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-8 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300/75">
              Customer feedback
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Customer Reviews
          </h2>

          <p className="mt-1.5 text-sm text-white/35">
            Honest feedback from our customers.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-xl sm:self-auto">
          <div className="flex size-11 items-center justify-center rounded-xl border border-yellow-300/15 bg-yellow-400/[0.07]">
            <Star className="size-5 fill-yellow-300 text-yellow-300" />
          </div>

          <div>
            <p className="text-xl font-semibold text-white">
              {summary.rating.toFixed(1)}
              <span className="ml-1 text-xs font-normal text-white/35">
                / 5
              </span>
            </p>

            <p className="text-xs text-white/40">
              {summary.reviewCount}{" "}
              {summary.reviewCount === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>
      </div>

      {/* Feedback messages */}
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-xl border border-red-300/15 bg-red-400/[0.07] p-3 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-300/15 bg-emerald-400/[0.07] p-3 text-sm text-emerald-200"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Review form or current user's review */}
      <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/10 backdrop-blur-2xl sm:p-7">
        {!isLoggedIn ? (
          <>
            <div className="mb-4 flex items-center gap-3">
              <MessageCircle className="size-5 text-emerald-300" />
              <h3 className="font-semibold text-white">
                Share your experience
              </h3>
            </div>

            <p className="rounded-xl border border-white/8 bg-white/2.5 p-4 text-sm text-white/50">
              Please{" "}
              <a
                href="/login"
                className="font-semibold text-emerald-300 hover:text-emerald-200"
              >
                log in
              </a>{" "}
              to write a review.
            </p>
          </>
        ) : myReview && !isEditing ? (
          <>
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="size-5 text-emerald-300" />
              <div>
                <h3 className="font-semibold text-white">Your review</h3>
                <p className="mt-1 text-xs text-white/35">
                  You can update or remove your review.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/2.5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`size-4 ${
                        value <= myReview.rating
                          ? "fill-yellow-300 text-yellow-300"
                          : "text-white/15"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs text-white/35">
                  {formatDate(myReview.createdAt)}
                </span>
              </div>

              <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-white/65">
                {myReview.comment}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/15 bg-emerald-400/5 px-4 py-3 text-sm font-medium text-emerald-200 transition-colors hover:bg-emerald-400/10"
              >
                <Pencil className="size-4" />
                Edit Review
              </button>

              <button
                type="button"
                onClick={() => {
                  setConfirmDelete(true);
                  setError("");
                  setSuccess("");
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-red-300/30 bg-red-400/5 px-4 py-3 text-sm font-medium text-red-300/80 transition-colors hover:bg-red-400/20 hover:text-red-200"
              >
                <Trash2 className="size-4" />
                Delete Review
              </button>
            </div>

            {confirmDelete && (
              <div className="mt-5 rounded-2xl border border-red-300/15 bg-red-400/5 p-4">
                <p className="text-sm font-semibold text-white">
                  Delete your review?
                </p>

                <p className="mt-1 text-sm leading-6 text-white/45">
                  This action cannot be undone. Your rating will no longer count
                  toward this product&apos;s average.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-2.5 text-sm font-semibold text-red-200 hover:bg-red-500/25 disabled:opacity-50"
                  >
                    {deleting && (
                      <LoaderCircle className="size-4 animate-spin" />
                    )}
                    {deleting ? "Deleting..." : "Yes, delete"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    disabled={deleting}
                    className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 hover:bg-white/5"
                  >
                    Keep Review
                  </button>
                </div>
              </div>
            )}
          </>
        ) : showReviewForm ? (
          <>
            <div className="mb-5 flex items-center gap-3">
              {isEditing ? (
                <Pencil className="size-5 text-emerald-300" />
              ) : (
                <MessageCircle className="size-5 text-emerald-300" />
              )}

              <div>
                <h3 className="font-semibold text-white">
                  {isEditing ? "Edit your review" : "Write a review"}
                </h3>
                <p className="mt-1 text-xs text-white/35">
                  {isEditing
                    ? "Update your rating and feedback."
                    : "Share your experience with this product."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Your rating
              </label>

              <div className="mb-5 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Rate ${value} out of 5 stars`}
                    aria-pressed={rating === value}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    onFocus={() => setHoverRating(value)}
                    onBlur={() => setHoverRating(0)}
                    onClick={() => setRating(value)}
                    className="rounded-lg p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <Star
                      className={`size-7 transition-colors ${
                        value <= (hoverRating || rating)
                          ? "fill-yellow-300 text-yellow-300"
                          : "text-white/20"
                      }`}
                    />
                  </button>
                ))}

                <span className="ml-2 text-sm text-white/45">
                  {rating > 0 ? `${rating} out of 5` : "Select a rating"}
                </span>
              </div>

              <label
                htmlFor={`review-comment-${productId}`}
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50"
              >
                Your comment
              </label>

              <textarea
                id={`review-comment-${productId}`}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                maxLength={2000}
                rows={4}
                placeholder="What did you think about this product?"
                className="w-full resize-y rounded-2xl border border-white/10 bg-[#061f17]/70 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/25 focus:border-emerald-300/30 focus:ring-2 focus:ring-emerald-400/10"
              />

              <div className="mt-2 flex justify-between text-xs text-white/30">
                <span>Be honest and helpful to other customers.</span>
                <span>{comment.length}/2000</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting || deleting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition-all hover:-translate-y-0.5 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}

                  {submitting
                    ? "Saving..."
                    : isEditing
                      ? "Save Changes"
                      : "Submit Review"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-medium text-white/60 hover:bg-white/[0.07] hover:text-white"
                  >
                    <X className="size-4" />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </>
        ) : null}
      </div>

      {/* Reviews list heading and sorting */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold text-white">
          All reviews{" "}
          <span className="ml-1 text-sm font-normal text-white/35">
            ({reviews.length})
          </span>
        </h3>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as ReviewSort)}
          className="w-full rounded-xl border border-white/10 bg-[#08251b] px-4 py-2.5 text-sm text-white/75 outline-none focus:border-emerald-300/30 sm:w-auto"
          aria-label="Sort reviews"
        >
          <option value="latest">Latest</option>
          <option value="top-rated">Top Rated</option>
        </select>
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/8 bg-white/2.5 py-14 text-sm text-white/45">
          <LoaderCircle className="size-5 animate-spin text-emerald-300" />
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-3xl border border-white/8 bg-white/2.5 px-6 py-12 text-center backdrop-blur-xl">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-emerald-300/10 bg-emerald-400/5">
            <MessageCircle className="size-6 text-emerald-300/70" />
          </div>

          <h3 className="font-semibold text-white">No reviews yet</h3>

          <p className="mt-2 text-sm text-white/40">
            Be the first to share your thoughts about this product.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const isOwnReview = myReview?.id === review.id;

            return (
              <article
                key={review.id}
                className="rounded-2xl border border-white/8 bg-white/2.5 p-5 backdrop-blur-xl transition-colors hover:border-white/12 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-400/[0.07] text-sm font-bold text-emerald-200">
                    {(review.user?.name || "Customer")
                      .trim()
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-white/90">
                        {review.user?.name || "Customer"}
                      </p>

                      {isOwnReview && (
                        <span className="rounded-full border border-emerald-300/15 bg-emerald-400/6 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                          Your review
                        </span>
                      )}
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Star
                            key={value}
                            className={`size-3.5 ${
                              value <= review.rating
                                ? "fill-yellow-300 text-yellow-300"
                                : "text-white/15"
                            }`}
                          />
                        ))}
                      </div>

                      <span className="text-xs text-white/30">
                        {formatDate(review.createdAt)}
                      </span>

                      {review.updatedAt !== review.createdAt && (
                        <span className="text-xs text-white/30">· Edited</span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-white/60">
                  {review.comment}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default UserReviews;
