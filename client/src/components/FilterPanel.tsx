import { ListFilterIcon, SlidersHorizontal } from "lucide-react";

const FilterPanel = ({
  categories,
  category,
  organic,
  minPrice,
  maxPrice,
  updateFilter,
  clearFilers,
  hasFilter,
}: any) => {
  const categoriesWithAll = [
    { slug: "", name: "All Categories" },
    ...categories,
  ];

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  return (
    <div className="relative overflow-hidden rounded-[1.4rem] bg-[#061f17]/70 p-4 backdrop-blur-2xl sm:p-5">
      {/* =========================================================
          PANEL AMBIENCE
      ========================================================= */}

      <div
        className="
          pointer-events-none absolute
          -right-10 -top-20
          size-48
          rounded-full
          bg-emerald-400/25
          blur-[80px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24 -left-10
          size-48
          rounded-full
          bg-orange-400/25
          blur-[80px]
        "
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 space-y-6">
        {/* =======================================================
            FILTER HEADER
        ======================================================= */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="
                flex size-9 items-center justify-center
                rounded-xl
                border border-emerald-300/10
                bg-emerald-400/10
                shadow-[0_0_25px_rgba(52,211,153,0.06)]
              "
            >
              <SlidersHorizontal className="size-4 text-emerald-300" />
            </div>

            <div>
              <p
                className="
                  text-[9px] font-bold
                  uppercase tracking-[0.2em]
                  text-emerald-300/60
                "
              >
                Refine
              </p>

              <h3 className="text-base font-bold text-white">Filters</h3>
            </div>
          </div>

          {hasFilter && (
            <span
              className="
                flex items-center gap-1.5
                rounded-full
                border border-emerald-400/15
                bg-emerald-400/10
                px-2.5 py-1
                text-[9px] font-semibold
                uppercase tracking-wider
                text-emerald-300
              "
            >
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Active
            </span>
          )}
        </div>

        {/* =======================================================
            CATEGORIES
        ======================================================= */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">
              Categories
            </h4>

            <span className="text-[10px] text-white/20">
              {categories.length} options
            </span>
          </div>

          <div className="space-y-1">
            {categoriesWithAll.map((cat: any) => {
              const isActive = category === cat.slug;

              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => updateFilter("category", cat.slug)}
                  className={`
                    group relative isolate
                    w-full
                    overflow-hidden
                    rounded-xl
                    px-3.5 py-2.5
                    text-left text-sm
                    font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-200 shadow-lg shadow-emerald-950/10"
                        : "border border-transparent text-white/50 hover:border-white/5 hover:bg-white/4.5 hover:text-white/80"
                    }
                  `}
                >
                  {/* Active left indicator */}
                  {isActive && (
                    <span
                      className="
                        absolute left-0 top-1/2
                        h-5 w-0.5
                        -translate-y-1/2
                        rounded-full
                        bg-emerald-300
                        shadow-[0_0_10px_rgba(110,231,183,0.7)]
                      "
                    />
                  )}

                  {/* Exact glass shine */}
                  {isActive && (
                    <span
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
                  )}

                  <span className="relative z-10 flex items-center justify-between gap-3">
                    <span className="truncate">{cat.name}</span>

                    {isActive && (
                      <span
                        className="
                          flex size-4 shrink-0
                          items-center justify-center
                          rounded-full
                          bg-emerald-300/15
                        "
                      >
                        <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_7px_rgba(110,231,183,0.8)]" />
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =======================================================
            DIVIDER
        ======================================================= */}

        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* =======================================================
            PRICE RANGE
        ======================================================= */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">
              Price Range
            </h4>

            <span className="text-sm text-orange-300/50">{currency}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Min */}
            <div className="relative flex-1">
              <span
                className="
                  pointer-events-none absolute
                  left-3 top-1/2
                  -translate-y-1/2
                  text-[10px] font-semibold
                  text-white/50
                "
              >
                {currency}
              </span>

              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-white/4.5
                  py-2.5 pl-7 pr-2.5
                  text-sm font-medium
                  text-white
                  outline-none
                  backdrop-blur-xl
                  transition-all duration-300
                  placeholder:text-white/20
                  hover:border-white/15
                  focus:border-emerald-400/30
                  focus:bg-emerald-400/4.5
                  focus:ring-4
                  focus:ring-emerald-400/5
                  [&::-webkit-inner-spin-button]:appearance-none
                  [&::-webkit-outer-spin-button]:appearance-none
                "
              />
            </div>

            <span className="shrink-0 text-xs text-white/40">—</span>

            {/* Max */}
            <div className="relative flex-1">
              <span
                className="
                  pointer-events-none absolute
                  left-3 top-1/2
                  -translate-y-1/2
                  text-[10px] font-semibold
                  text-white/50
                "
              >
                {currency}
              </span>

              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-white/4.5
                  py-2.5 pl-7 pr-2.5
                  text-sm font-medium
                  text-white
                  outline-none
                  backdrop-blur-xl
                  transition-all duration-300
                  placeholder:text-white/20
                  hover:border-white/15
                  focus:border-emerald-400/30
                  focus:bg-emerald-400/4.5
                  focus:ring-4
                  focus:ring-emerald-400/5
                  [&::-webkit-inner-spin-button]:appearance-none
                  [&::-webkit-outer-spin-button]:appearance-none
                "
              />
            </div>
          </div>

          {/* Price hint */}
          {(minPrice || maxPrice) && (
            <p className="mt-2 text-[10px] text-emerald-300/45">
              Showing products within your selected range.
            </p>
          )}
        </div>

        {/* =======================================================
            CLEAR FILTERS
        ======================================================= */}

        {hasFilter && (
          <button
            type="button"
            onClick={clearFilers}
            className="
              group relative isolate
              w-full
              overflow-hidden
              rounded-xl
              border border-orange-300/10
              bg-orange-400/6
              px-4 py-2.5
              text-sm font-semibold
              text-orange-200/80
              shadow-lg shadow-orange-950/5
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-orange-300/20
              hover:bg-orange-400/10
              hover:text-orange-100
              hover:shadow-orange-950/10
              active:translate-y-0
              active:scale-[0.98]
            "
          >
            {/* Shine */}
            <span
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

            <span className="relative z-10 flex items-center justify-center gap-2">
              <ListFilterIcon
                className="
                  size-4
                  transition-transform duration-300
                  group-hover:rotate-12
                  group-hover:scale-110
                "
              />
              Clear Filters
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
