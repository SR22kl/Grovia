import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";

const BrowseCategories = () => {
  return (
    <section className="relative py-14 sm:py-16">
      {/* =========================================================
          SECTION HEADER
      ========================================================= */}

      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-6 bg-emerald-400/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/70">
              Explore
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Browse Categories
          </h2>

          <p className="mt-1.5 text-xs text-white/35 sm:text-sm">
            Find exactly what you need!
          </p>
        </div>

        <div className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/25 sm:flex">
          <span>Swipe to explore</span>
          <ArrowUpRight className="size-3" />
        </div>
      </div>

      {/* =========================================================
          CATEGORY GLASS CONTAINER
      ========================================================= */}

      <div className="group relative isolate overflow-hidden rounded-4xl border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-black/10 backdrop-blur-2xl sm:p-4">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-orange-300/[0.035] blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-24 right-10 size-56 rounded-full bg-emerald-400/4.5 blur-[100px]" />

        {/* =========================================================
            GLASS SHINE
        ========================================================= */}

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

        {/* =========================================================
            CATEGORY LIST
        ========================================================= */}

        <div className="relative z-10 flex overflow-x-auto no-scrollbar">
          {categoriesData.map((cat, index) => (
            <Link
              key={cat?.slug}
              to={`/products?category=${cat?.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="
                group/category
                relative flex min-w-26.25
                shrink-0 flex-col items-center
                gap-3 rounded-2xl
                px-3 py-4
                transition-all duration-300
                hover:-translate-y-1
                sm:min-w-31.25
                sm:px-4
              "
              style={{
                animation: `categoryReveal 0.5s cubic-bezier(.16,1,.3,1) ${
                  index * 70
                }ms both`,
              }}
            >
              {/* Individual shine */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  -translate-x-full
                  rounded-2xl
                  bg-linear-to-r
                  from-transparent
                  via-white/[0.035]
                  to-transparent
                  transition-transform duration-700
                  group-hover/category:translate-x-full
                "
              />

              {/* Image glass */}
              <div
                className="
                  relative flex size-19
                  items-center justify-center
                  overflow-hidden
                  rounded-[1.4rem]
                  border border-white/10
                  bg-white/5.5
                  p-2
                  shadow-lg shadow-black/10
                  backdrop-blur-xl
                  transition-all duration-300
                  group-hover/category:scale-[1.04]
                  group-hover/category:border-orange-300/25
                  group-hover/category:bg-orange-300/8
                  group-hover/category:shadow-orange-950/20
                  sm:size-23
                "
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/6 to-transparent opacity-0 transition-opacity duration-300 group-hover/category:opacity-100" />

                <img
                  src={cat?.image}
                  alt={cat?.name}
                  className="
                    relative z-10
                    h-full w-full
                    rounded-full
                    object-contain
                    transition-transform
                    duration-500
                    ease-out
                    group-hover/category:scale-110
                  "
                />
              </div>

              {/* Category name */}
              <span
                className="
                  relative z-10
                  text-center
                  text-[11px]
                  font-semibold
                  leading-tight
                  text-white/45
                  transition-colors duration-300
                  group-hover/category:text-orange-300
                  sm:text-xs
                "
              >
                {cat?.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom edge */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <style>{`
        @keyframes categoryReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BrowseCategories;
