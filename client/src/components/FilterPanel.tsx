import { ListFilterIcon } from "lucide-react";

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

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-xl shadow-emerald-950/5 backdrop-blur-xl">
        {/* Decorative gradient glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-green-300/20 blur-3xl" />

        <div className="relative space-y-7">
          {/* Categories */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-app-green">Categories</h3>

              {category && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Active
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              {categoriesWithAll.map((cat: any) => {
                const isActive = category === cat.slug;

                return (
                  <button
                    key={cat.slug}
                    onClick={() => updateFilter("category", cat.slug)}
                    className={`group relative w-full overflow-hidden rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-linear-to-r from-app-green via-emerald-700 to-green-600 text-white shadow-md shadow-emerald-900/20"
                        : "text-app-text-light hover:bg-white/80 hover:text-app-green hover:shadow-sm"
                    }`}
                  >
                    {/* Active shine */}
                    {isActive && (
                      <span className="absolute inset-0 bg-linear-to-r from-white/10 via-transparent to-white/10" />
                    )}

                    <span className="relative flex items-center justify-between">
                      {cat.name}

                      {isActive && (
                        <span className="size-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-emerald-200/70 to-transparent" />

          {/* Price Range */}
          <div>
            <h3 className="mb-3 text-lg font-bold text-app-green">
              Price Range
            </h3>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200/80 bg-white/70 px-3.5 py-2.5 text-sm font-medium text-zinc-700 outline-none backdrop-blur-md transition-all duration-300 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <span className="text-sm font-semibold text-emerald-700/60">
                —
              </span>

              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200/80 bg-white/70 px-3.5 py-2.5 text-sm font-medium text-zinc-700 outline-none backdrop-blur-md transition-all duration-300 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasFilter && (
            <button
              onClick={clearFilers}
              className="group relative w-full overflow-hidden rounded-xl border border-emerald-700/20 bg-linear-to-r from-emerald-50 via-white to-green-50 px-4 py-2.5 text-sm font-semibold text-app-green shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-900/10 active:translate-y-0 active:scale-[0.98]"
            >
              {/* Hover gradient */}
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-emerald-600 via-green-600 to-emerald-600 transition-transform duration-500 group-hover:translate-x-0" />

              <span className="relative flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white">
                <ListFilterIcon className="size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                Clear Filters
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
