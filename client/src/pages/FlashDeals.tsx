import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyProducts } from "../assets/assets";
import { Zap, Sparkles, Clock3 } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(dummyProducts.filter((p: Product) => p.stock > 0));

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#031c14] text-white">
      {/* LIQUID GLASS BACKGROUND */}
      <div className="pointer-events-none fixed inset-0  overflow-hidden">
        {/* Top-left emerald glow */}
        <div
          className="
          pointer-events-none absolute
          left-10 top-10
          size-105
          rounded-full
          bg-emerald-400/50
          blur-[150px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
        />

        <div
          className="
          pointer-events-none absolute
          -left-40 top-240
          size-105
          rounded-full
          bg-emerald-400/30
          blur-[120px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
        />

        {/* Top-right orange glow */}
        <div
          className="
          pointer-events-none absolute
          -right-40 top-[20%]
          size-120
          rounded-full
          bg-orange-400/20
          blur-[120px]
          animate-[liquidFloatReverse_15s_ease-in-out_infinite]
        "
        />

        <div
          className="
          pointer-events-none absolute
          -right-20 top-480
          size-95
          rounded-full
          bg-orange-400/20
          blur-[120px]
          animate-[liquidFloatReverse_15s_ease-in-out_infinite]
        "
        />

        {/* Center emerald glow */}
        <div
          className="
          pointer-events-none absolute
          left-[38%] top-[45%]
          size-120
          rounded-full
          bg-emerald-500/60
          blur-[150px]
          animate-[liquidPulse_11s_ease-in-out_infinite]
        "
        />
        <div
          className="
          pointer-events-none absolute
          left-[48%] top-600
          size-80
          rounded-full
          bg-emerald-500/50
          blur-[130px]
          animate-[liquidPulse_11s_ease-in-out_infinite]
        "
        />

        {/* Bottom orange glow */}
        <div
          className="
          pointer-events-none absolute
          -bottom-48 -left-20
          size-95
          rounded-full
          bg-orange-400/40
          blur-[130px]
          animate-[liquidFloat_14s_ease-in-out_infinite]
        "
        />

        {/* =========================================================
          SUBTLE GLASS GRID
      ========================================================= */}

        <div
          className="
          pointer-events-none absolute inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:72px_72px]
        "
        />

        {/* Top gloss */}
        <div
          className="
          pointer-events-none absolute inset-x-0 top-0
          h-105
          bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.07),transparent_65%)]
        "
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      {/* Navbar */}
      <section className="animate-[pageReveal_.5s_cubic-bezier(.16,1,.3,1)] mt-8">
        <Navbar />
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* FLASH DEALS HERO */}

        <section
          className="
            group relative isolate mt-6
            overflow-hidden
            rounded-4xl
            border border-white/10
            bg-linear-to-br
            from-orange-500/16
            via-white/4.5
            to-emerald-400/8
            shadow-2xl shadow-black/20
            backdrop-blur-2xl
            sm:mt-8
          "
        >
          {/* Ambient hero glow */}
          <div
            className="
              pointer-events-none absolute
              -left-20 -top-24
              size-72
              rounded-full
              bg-orange-400/15
              blur-[100px]
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-32 -right-20
              size-96
              rounded-full
              bg-emerald-400/10
              blur-[110px]
            "
          />

          {/* Grid */}
          <div
            className="
              pointer-events-none absolute inset-0
              opacity-[0.035]
              [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
              [background-size:60px_60px]
            "
          />

          {/* Exact glass shine */}
          <div
            className="
              pointer-events-none absolute inset-y-0 left-[-120%]
              z-20
              w-[70%]
              skew-x-[-18deg]
              bg-linear-to-r
              from-transparent
              via-white/8
              to-transparent
              opacity-0
              transition-[left,opacity]
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:left-[150%]
              group-hover:opacity-100
            "
          />

          {/* Content */}
          <div
            className="
              relative z-10
              flex flex-col items-center
              px-5 py-10
              text-center
              sm:px-8 sm:py-12
              lg:px-12 lg:py-14
            "
          >
            {/* Badge */}
            <div
              className="
                mb-5 inline-flex items-center gap-2
                rounded-full
                border border-orange-300/20
                bg-orange-400/10
                px-4 py-2
                text-[10px] font-bold uppercase
                tracking-[0.2em]
                text-orange-200
                shadow-lg shadow-orange-500/5
                backdrop-blur-xl
                sm:text-xs
              "
            >
              <Sparkles className="size-3.5 text-orange-300 sm:size-4" />
              Limited Time Offers
              <Sparkles className="size-3.5 text-orange-300 sm:size-4" />
            </div>

            {/* Heading */}
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <div
                className="
                  flex size-10 items-center justify-center
                  rounded-2xl
                  border border-yellow-300/15
                  bg-yellow-300/10
                  shadow-[0_0_35px_rgba(250,204,21,0.12)]
                  sm:size-14
                "
              >
                <Zap
                  className="
                    size-5
                    fill-yellow-300
                    text-yellow-200
                    drop-shadow-[0_0_12px_rgba(255,255,0,0.8)]
                    sm:size-7
                  "
                />
              </div>

              <h1
                className="
                  font-serif
                  text-4xl font-bold
                  tracking-tight
                  text-white
                  drop-shadow-lg
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                Flash Deals
              </h1>

              <div
                className="
                  flex size-10 items-center justify-center
                  rounded-2xl
                  border border-yellow-300/15
                  bg-yellow-300/10
                  shadow-[0_0_35px_rgba(250,204,21,0.12)]
                  sm:size-14
                "
              >
                <Zap
                  className="
                    size-5
                    fill-yellow-300
                    text-yellow-200
                    drop-shadow-[0_0_12px_rgba(255,255,0,0.8)]
                    sm:size-7
                  "
                />
              </div>
            </div>

            {/* Accent line */}
            <div
              className="
                mt-4 h-1 w-24
                rounded-full
                bg-linear-to-r
                from-orange-400
                via-yellow-300
                to-orange-400
                shadow-[0_0_20px_rgba(251,146,60,0.35)]
              "
            />

            {/* Description */}
            <p
              className="
                mt-5 max-w-xl
                text-sm leading-relaxed
                text-white/65
                sm:text-base
              "
            >
              Grab incredible deals before they're gone.
              <br className="hidden sm:block" />
              Shop now and save{" "}
              <span className="font-semibold text-orange-200">
                up to 50% off.
              </span>
            </p>

            {/* Stats */}
            <div
              className="
                mt-8 flex items-center
                rounded-2xl
                border border-white/10
                bg-black/10
                px-5 py-3
                shadow-xl shadow-black/10
                backdrop-blur-xl
                sm:px-7
              "
            >
              <div className="min-w-16 text-center">
                <p className="text-xl font-bold text-white sm:text-2xl">
                  {products.length}
                </p>

                <p
                  className="
                    mt-0.5 text-[9px]
                    font-medium uppercase
                    tracking-[0.15em]
                    text-white/40
                    sm:text-[10px]
                  "
                >
                  Deals
                </p>
              </div>

              <div className="mx-4 h-8 w-px bg-white/10 sm:mx-6" />

              <div className="flex items-center gap-2.5">
                <div
                  className="
                    flex size-8 items-center justify-center
                    rounded-xl
                    bg-yellow-300/10
                    text-yellow-200
                  "
                >
                  <Zap className="size-4 fill-yellow-300" />
                </div>

                <div>
                  <p className="text-sm font-bold text-white sm:text-base">
                    Up to 50%
                  </p>

                  <p
                    className="
                      text-[9px]
                      font-medium uppercase
                      tracking-[0.15em]
                      text-white/40
                      sm:text-[10px]
                    "
                  >
                    Savings
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom highlight */}
          <div
            className="
              absolute inset-x-0 bottom-0
              h-px
              bg-linear-to-r
              from-transparent
              via-orange-300/40
              to-transparent
            "
          />
        </section>

        {/* =======================================================
            PRODUCTS SECTION
        ======================================================= */}

        <section className="mt-12 sm:mt-16">
          {/* Section Header */}
          <div
            className="
              mb-7 flex flex-col gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              {/* Eyebrow */}
              <div
                className="
                  mb-2 flex items-center gap-2
                  text-[10px] font-bold
                  uppercase tracking-[0.2em]
                  text-orange-300/80
                "
              >
                <span className="size-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.7)]" />
                Limited Time
              </div>

              {/* Title */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex size-10 shrink-0
                    items-center justify-center
                    rounded-2xl
                    border border-orange-300/15
                    bg-orange-400/10
                    shadow-lg shadow-orange-500/5
                  "
                >
                  <Zap className="size-5 fill-yellow-300 text-yellow-200" />
                </div>

                <h2
                  className="
                    font-serif
                    text-2xl font-bold
                    tracking-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  Today's Hot Deals
                </h2>
              </div>

              <p className="mt-2 text-sm text-white/45">
                Don't miss these limited-time offers.
              </p>
            </div>

            {/* Deal count */}
            {!loading && products.length > 0 && (
              <div
                className="
                  flex w-fit items-center gap-2
                  rounded-full
                  border border-white/10
                  bg-white/4.5
                  px-4 py-2
                  text-xs font-semibold
                  text-white/60
                  shadow-lg shadow-black/10
                  backdrop-blur-xl
                "
              >
                <Clock3 className="size-3.5 text-orange-300" />
                {products.length} deals available
              </div>
            )}
          </div>

          {/* =====================================================
              CONTENT
          ===================================================== */}

          {loading ? (
            <div
              className="
                flex min-h-60
                items-center justify-center
                rounded-3xl
                border border-white/10
                bg-white/[0.035]
                backdrop-blur-2xl
              "
            >
              <Loading />
            </div>
          ) : products.length === 0 ? (
            /* Empty State */
            <div
              className="
                group relative isolate
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.035]
                px-6 py-20
                text-center
                shadow-2xl shadow-black/10
                backdrop-blur-2xl
              "
            >
              {/* Glow */}
              <div
                className="
                  pointer-events-none absolute
                  left-1/2 top-0
                  size-56
                  -translate-x-1/2
                  rounded-full
                  bg-orange-400/8
                  blur-[90px]
                "
              />

              {/* Shine */}
              <div
                className="
                  pointer-events-none absolute inset-y-0 left-[-120%]
                  z-20
                  w-[70%]
                  skew-x-[-18deg]
                  bg-linear-to-r
                  from-transparent
                  via-white/8
                  to-transparent
                  opacity-0
                  transition-[left,opacity]
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:left-[150%]
                  group-hover:opacity-100
                "
              />

              <div className="relative z-10">
                <div
                  className="
                    mx-auto mb-5
                    flex size-20
                    items-center justify-center
                    rounded-3xl
                    border border-orange-300/10
                    bg-orange-400/10
                    shadow-[0_0_40px_rgba(251,146,60,0.08)]
                  "
                >
                  <Zap className="size-9 text-orange-300" />
                </div>

                <h2 className="mb-2 text-2xl font-bold text-white">
                  No Deals Available
                </h2>

                <p className="text-sm text-white/45">
                  Check back soon for amazing deals!
                </p>
              </div>
            </div>
          ) : (
            /* Products */
            <div
              className="
                grid grid-cols-2
                gap-4
                sm:grid-cols-3
                md:grid-cols-4
                xl:grid-cols-5
                xl:gap-6
              "
            >
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-[dealCardReveal_.55s_cubic-bezier(.16,1,.3,1)_both]"
                  style={{
                    animationDelay: `${index * 45}ms`,
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* =========================================================
          BOTTOM FADE
      ========================================================= */}

      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0
          h-80
          bg-linear-to-t
          from-[#031c14]
          via-[#031c14]/60
          to-transparent
        "
      />

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`
        @keyframes pageReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.99);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes dealCardReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes liquidFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          35% {
            transform: translate3d(35px, -25px, 0) scale(1.06);
          }

          70% {
            transform: translate3d(-20px, 30px, 0) scale(0.96);
          }
        }

        @keyframes liquidFloatReverse {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          40% {
            transform: translate3d(-30px, 25px, 0) scale(1.05);
          }

          75% {
            transform: translate3d(25px, -20px, 0) scale(0.96);
          }
        }

        @keyframes liquidPulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(1);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default FlashDeals;
