import { useMemo } from "react";
import type { Product } from "../types";
import { StarIcon, ThumbsUpIcon, MessageCircle, Sparkles } from "lucide-react";

const REVIEWERS = [
  { name: "Ananya S.", avatar: "AS" },
  { name: "Rahul M.", avatar: "RM" },
  { name: "Priya K.", avatar: "PK" },
  { name: "Vikram J.", avatar: "VJ" },
  { name: "Meera D.", avatar: "MD" },
  { name: "Arjun R.", avatar: "AR" },
  { name: "Sneha T.", avatar: "ST" },
  { name: "Karan P.", avatar: "KP" },
];

const COMMENTS = [
  "Absolutely love this product! Fresh and great quality. Will definitely order again.",
  "Good value for the price. Packaging was neat and delivery was on time.",
  "Quality is decent but I expected it to be a bit fresher. Still a solid buy overall.",
  "This has become a staple in my kitchen now. Highly recommended for everyone!",
  "Exceeded my expectations. The taste and freshness were top-notch. Five stars!",
  "Pretty good! Not the absolute best I've had, but definitely worth the price.",
  "Arrived in perfect condition. Very satisfied with the purchase, ordering more soon.",
  "Great product, my family loved it. The organic quality really shows in the taste.",
];

function seededRandom(seed: string) {
  let h = 0;

  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }

  return () => {
    h = (h ^ (h >>> 16)) * 0x45d9f3b;
    h = (h ^ (h >>> 16)) * 0x45d9f3b;
    h ^= h >>> 16;

    return (h >>> 0) / 0xffffffff;
  };
}

export default function DummyReviewsSection({ product }: { product: Product }) {
  const reviews = useMemo(() => {
    const rng = seededRandom(product._id);

    const count = Math.min(product.reviewCount, 6);

    const daysAgo = [3, 7, 14, 21, 35, 48];

    return Array.from({ length: count }, (_, i) => {
      const r =
        REVIEWERS[
          (Math.floor(rng() * REVIEWERS.length) + i) % REVIEWERS.length
        ];

      const rating = Math.max(
        3,
        Math.min(5, Math.round(product.rating + (rng() - 0.5) * 2)),
      );

      const d = new Date();

      d.setDate(d.getDate() - daysAgo[i % daysAgo.length]);

      return {
        id: i,
        ...r,
        rating,
        date: d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        comment:
          COMMENTS[(Math.floor(rng() * COMMENTS.length) + i) % COMMENTS.length],
        helpful: Math.floor(rng() * 20) + 1,
      };
    });
  }, [product]);

  /* ─────────────────────────────────────────
     Rating breakdown
  ───────────────────────────────────────── */

  const breakdown = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];

    reviews.forEach((review) => {
      counts[review.rating - 1]++;
    });

    return counts.reverse(); // 5 → 1
  }, [reviews]);

  const maxCount = Math.max(...breakdown, 1);

  return (
    <section>
      {/* HEADER */}

      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-8 rounded-full bg-emerald-400" />

          <span
            className="
              text-[10px] font-bold
              uppercase tracking-[0.18em]
              text-emerald-300/70
            "
          >
            What customers say
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="
                text-2xl font-semibold
                tracking-tight text-white
                sm:text-3xl
              "
            >
              Customer Reviews
            </h2>

            <p className="mt-1 text-sm text-white/35">
              Real feedback from customers who purchased this product.
            </p>
          </div>

          <div
            className="
              flex w-fit items-center gap-2
              rounded-full
              border border-white/8
              bg-white/[0.025]
              px-3 py-1.5
              text-xs text-white/40
              backdrop-blur-xl
            "
          >
            <MessageCircle className="size-3.5 text-emerald-300/60" />
            {product.reviewCount} reviews
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN REVIEW CARD
      ===================================================== */}
      <div
        className="
          group/reviews
          relative isolate
          overflow-hidden
          rounded-[2rem]
          border border-white/10
          bg-white/[0.035]
          shadow-[0_25px_80px_rgba(0,0,0,0.18)]
          backdrop-blur-2xl
        "
      >
        {/* Main glass shine */}
        <div
          className="
            pointer-events-none absolute inset-y-0 left-[-120%]
            z-30 w-[70%] skew-x-[-18deg]
            bg-linear-to-r
            from-transparent
            via-white/8
            to-transparent
            opacity-0
            transition-[left,opacity]
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover/reviews:left-[150%]
            group-hover/reviews:opacity-100
          "
        />

        {/* Ambient emerald glow */}
        <div
          className="
            pointer-events-none absolute
            -left-32 -top-32
            size-80
            rounded-full
            bg-emerald-400/[0.055]
            blur-[100px]
          "
        />

        {/* Ambient orange glow */}
        <div
          className="
            pointer-events-none absolute
            -bottom-32 -right-32
            size-80
            rounded-full
            bg-orange-400/[0.035]
            blur-[100px]
          "
        />

        <div className="relative z-10 p-5 sm:p-7 lg:p-8">
          {/* =================================================
              SUMMARY
          ================================================= */}
          <div
            className="
              grid
              gap-6
              border-b border-white/8
              pb-7
              md:grid-cols-[220px_1fr]
              md:gap-10
              lg:grid-cols-[250px_1fr]
            "
          >
            {/* Average rating */}
            <div
              className="
                relative flex
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
                border border-white/8
                bg-white/[0.025]
                px-5 py-7
                text-center
              "
            >
              {/* Small inner glow */}
              <div
                className="
                  pointer-events-none absolute
                  left-1/2 top-1/2
                  size-36
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-emerald-400/[0.07]
                  blur-3xl
                "
              />

              <div className="relative">
                <span
                  className="
                    bg-linear-to-r
                    from-emerald-300
                    via-emerald-200
                    to-teal-300
                    bg-clip-text
                    text-5xl
                    font-bold
                    tracking-tight
                    text-transparent
                  "
                >
                  {product.rating}
                </span>

                <span className="ml-1 text-sm text-white/30">/ 5</span>
              </div>

              {/* Stars */}
              <div className="relative mt-3 flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`
                      size-4
                      transition-transform duration-300
                      hover:scale-110

                      ${
                        star <= Math.round(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-white/10"
                      }
                    `}
                  />
                ))}
              </div>

              <p className="relative mt-2 text-xs text-white/35">
                Based on {product.reviewCount} reviews
              </p>

              <div
                className="
                  relative mt-4
                  flex items-center gap-1.5
                  rounded-full
                  border border-emerald-300/10
                  bg-emerald-400/[0.05]
                  px-3 py-1.5
                  text-[10px]
                  font-medium
                  text-emerald-200/60
                "
              >
                <Sparkles className="size-3" />
                Customer rating
              </div>
            </div>

            {/* Rating breakdown */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white/80">
                    Rating breakdown
                  </h3>

                  <p className="mt-0.5 text-xs text-white/30">
                    See how customers rated this product
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {breakdown.map((count, i) => {
                  const ratingNumber = 5 - i;

                  const percentage = (count / maxCount) * 100;

                  return (
                    <div
                      key={ratingNumber}
                      className="
                        flex items-center gap-3
                      "
                    >
                      {/* Star label */}
                      <span
                        className="
                          flex w-8 shrink-0
                          items-center justify-end gap-1
                          text-xs font-medium
                          text-white/45
                        "
                      >
                        {ratingNumber}
                        <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                      </span>

                      {/* Bar */}
                      <div
                        className="
                          relative h-2.5
                          flex-1
                          overflow-hidden
                          rounded-full
                          border border-white/5
                          bg-white/[0.045]
                        "
                      >
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-linear-to-r
                            from-amber-400
                            to-orange-300
                            transition-all
                            duration-700
                          "
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      {/* Count */}
                      <span
                        className="
                          w-6 shrink-0
                          text-right
                          text-[11px]
                          font-medium
                          text-white/30
                        "
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =================================================
              REVIEWS
          ================================================= */}
          <div className="mt-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white/80">
                  Latest reviews
                </h3>

                <p className="mt-0.5 text-xs text-white/30">
                  What people are saying
                </p>
              </div>

              <div
                className="
                  hidden items-center gap-2
                  rounded-full
                  border border-white/8
                  bg-white/[0.025]
                  px-3 py-1.5
                  text-[10px]
                  text-white/35
                  sm:flex
                "
              >
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Verified feedback
              </div>
            </div>

            <div className="space-y-3">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="
                    group/review
                    relative
                    overflow-hidden
                    rounded-2xl
                    border border-white/7
                    bg-white/[0.018]
                    p-4
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:border-white/12
                    hover:bg-white/[0.03]
                  "
                >
                  {/* Subtle hover shine */}
                  <div
                    className="
                      pointer-events-none absolute inset-y-0
                      left-[-100%]
                      w-1/3
                      skew-x-[-18deg]
                      bg-linear-to-r
                      from-transparent
                      via-white/[0.035]
                      to-transparent
                      transition-[left]
                      duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover/review:left-[130%]
                    "
                  />

                  <div className="relative z-10 flex gap-3.5">
                    {/* Avatar */}
                    <div
                      className="
                        flex size-10
                        shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-emerald-300/15
                        bg-emerald-400/[0.07]
                        text-xs
                        font-bold
                        text-emerald-200/80
                        shadow-inner
                      "
                    >
                      {review.avatar}
                    </div>

                    {/* Review content */}
                    <div className="min-w-0 flex-1">
                      {/* Reviewer metadata */}
                      <div
                        className="
                          flex flex-wrap
                          items-center
                          gap-x-2
                          gap-y-1
                        "
                      >
                        <span className="text-sm font-semibold text-white/80">
                          {review.name}
                        </span>

                        <span className="text-white/15">·</span>

                        <span className="text-xs text-white/30">
                          {review.date}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="mt-1.5 flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`
                              size-3.5
                              ${
                                star <= review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-white/10"
                              }
                            `}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p
                        className="
                          mt-2.5
                          text-sm
                          leading-6
                          text-white/45
                        "
                      >
                        {review.comment}
                      </p>

                      {/* Helpful */}
                      <button
                        type="button"
                        className="
                          mt-3
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          border border-transparent
                          px-2 py-1
                          text-[11px]
                          text-white/30
                          transition-all duration-200
                          hover:border-white/8
                          hover:bg-white/[0.035]
                          hover:text-emerald-200/70
                        "
                      >
                        <ThumbsUpIcon className="size-3.5" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
