import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Product } from "../types";
import { categoriesData, dummyProducts } from "../assets/assets";
import {
  Check,
  ChevronDown,
  Home,
  SlidersHorizontal,
  XIcon,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";
import Navbar from "../components/Navbar";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const sortOptions = [
    { value: "", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedSort =
    sortOptions.find((option) => option.value === sort)?.label || "Newest";

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    if (key !== "page") {
      newParams.delete("page");
    }

    setSearchParams(newParams);
  };

  const clearFilers = () => {
    setSearchParams({});
    setMobileFiltersOpen(false);
  };

  const activeCategory = categoriesData.find((cat) => cat.slug === category);

  const hasFilters = category || organic || sort || minPrice || maxPrice;

  const fetchProducts = async () => {
    setLoading(true);

    try {
      setProducts(
        dummyProducts.filter(
          (product) => product.category === category || category === "",
        ),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, organic, sort, page, minPrice, maxPrice]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#031c14] text-white">
      {/* GLASS BACKGROUND */}
      <div className="pointer-events-none fixed inset-0  overflow-hidden">
        {/* Top-left emerald glow */}
        <div
          className="
          pointer-events-none absolute
          -left-40 -top-40
          size-150
          rounded-full
          bg-emerald-400/25
          blur-[120px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
        />
        <div
          className="
          pointer-events-none absolute
          -left-20 top-220
          size-105
          rounded-full
          bg-emerald-400/40
          blur-[120px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
        />
        <div
          className="
          pointer-events-none absolute
          -left-20 top-720
          size-105
          rounded-full
          bg-emerald-400/40
          blur-[120px]
          animate-[liquidFloat_12s_ease-in-out_infinite]
        "
        />

        {/* Top-right teal glow */}
        <div
          className="
          pointer-events-none absolute
          -right-32 top-60
          size-120
          rounded-full
          bg-teal-300/25
          blur-[110px]
          animate-[liquidFloatReverse_15s_ease-in-out_infinite]
        "
        />
        <div
          className="
          pointer-events-none absolute
          -right-32 top-450
          size-90
          rounded-full
          bg-teal-300/30
          blur-[110px]
          animate-[liquidFloatReverse_15s_ease-in-out_infinite]
        "
        />
        <div
          className="
          pointer-events-none absolute
          -right-32 top-1050
          size-90
          rounded-full
          bg-teal-300/30
          blur-[110px]
          animate-[liquidFloatReverse_15s_ease-in-out_infinite]
        "
        />

        {/* Center emerald glow */}
        <div
          className="
          pointer-events-none absolute
          left-[30%] top-[25%]
          size-180
          rounded-full
          bg-emerald-500/60
          blur-[125px]
          animate-[liquidPulse_10s_ease-in-out_infinite]
        "
        />

        {/* Bottom orange glow */}
        <div
          className="
          pointer-events-none absolute
          -bottom-48 left-10
          size-105
          rounded-full
          bg-orange-400/30
          blur-[130px]
          animate-[liquidFloat_14s_ease-in-out_infinite]
        "
        />

        {/* Subtle glass grid */}
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

      {/* Navbar */}
      <section className="animate-[pageReveal_.5s_cubic-bezier(.16,1,.3,1)] mt-8">
        <Navbar />
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* BREADCRUMB */}

        <nav
          className="
            mt-6 flex items-center gap-2
            text-xs text-white/35
            animate-[pageReveal_.5s_cubic-bezier(.16,1,.3,1)]
            sm:text-sm
          "
        >
          <Link
            to="/"
            className="
              flex items-center justify-center
              rounded-lg p-1.5
              transition-colors duration-200
              hover:bg-white/5
              hover:text-emerald-300
            "
          >
            <Home className="size-4 sm:size-5" />
          </Link>

          <span className="text-white/15">/</span>

          <span className="font-medium text-white/70">
            {activeCategory ? activeCategory.name : "All Products"}
          </span>
        </nav>

        {/* PAGE HEADER */}

        <section
          className="
            mt-6
            animate-[pageReveal_.6s_cubic-bezier(.16,1,.3,1)]
            sm:mt-8
          "
        >
          <div
            className="
              group relative isolate
              overflow-hidden
              rounded-[1.75rem]
              border border-white/10
              bg-white/[0.035]
              px-5 py-6
              shadow-2xl shadow-black/10
              backdrop-blur-2xl
              sm:px-7 sm:py-7
            "
          >
            {/* Ambient glow */}
            <div
              className="
                pointer-events-none absolute
                -right-20 -top-24
                size-64
                rounded-full
                bg-emerald-400/8
                blur-[100px]
              "
            />

            {/* Glass shine */}
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
              {/* Eyebrow */}
              <div
                className="
                  mb-2 flex items-center gap-2
                  text-[10px] font-bold uppercase
                  tracking-[0.2em]
                  text-emerald-300/70
                  sm:text-xs
                "
              >
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                Fresh & Organic
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1
                    className="
                      font-serif
                      text-3xl font-bold
                      tracking-tight
                      text-white
                      sm:text-4xl
                    "
                  >
                    {activeCategory ? activeCategory.name : "All Products"}
                  </h1>

                  <p className="mt-2 text-sm text-white/40">
                    Discover fresh picks curated for your everyday needs.
                  </p>
                </div>

                {!loading && (
                  <div
                    className="
                      flex w-fit items-center gap-2
                      rounded-full
                      border border-white/10
                      bg-white/4.5
                      px-3.5 py-2
                      text-xs font-semibold
                      text-white/55
                      backdrop-blur-xl
                    "
                  >
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    {products.length} Products Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 flex gap-6 xl:gap-8">
          {/* DESKTOP FILTER SIDEBAR */}

          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <div
                className="
                  relative overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.035]
                  p-1
                  shadow-2xl shadow-black/10
                  backdrop-blur-2xl
                "
              >
                <FilterPanel
                  categories={categoriesData}
                  category={category}
                  updateFilter={updateFilter}
                  clearFilers={clearFilers}
                  hasFilter={hasFilters}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  organic={organic}
                />
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}

          <section className="min-w-0 flex-1">
            {/* Toolbar */}
            <div
              className="
                mb-6 flex flex-col gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* Mobile filter button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="
                  group relative isolate
                  flex w-full items-center justify-center gap-2
                  overflow-hidden
                  rounded-xl
                  border border-white/10
                  bg-white/4.5
                  px-4 py-2.5
                  text-sm font-semibold
                  text-white/70
                  shadow-lg shadow-black/10
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-emerald-400/25
                  hover:bg-emerald-400/10
                  hover:text-emerald-200
                  active:translate-y-0
                  active:scale-[0.98]
                  lg:hidden
                "
              >
                <span
                  className="
                    pointer-events-none absolute inset-y-0 -left-full
                    w-1/2 skew-x-[-18deg]
                    bg-linear-to-r
                    from-transparent via-white/8 to-transparent
                    opacity-0
                    transition-[left,opacity]
                    duration-600
                    group-hover:left-[150%]
                    group-hover:opacity-100
                  "
                />

                <SlidersHorizontal
                  className="
                    relative z-10 size-4
                    transition-transform duration-300
                    group-hover:rotate-12
                  "
                />

                <span className="relative z-10">Filters</span>

                {hasFilters && (
                  <span
                    className="
                      relative z-10
                      flex size-5 items-center justify-center
                      rounded-full
                      bg-emerald-400/15
                      text-[10px]
                      text-emerald-300
                    "
                  >
                    !
                  </span>
                )}
              </button>

              {/* Sort */}
              <div ref={sortRef} className="relative ml-auto">
                <button
                  type="button"
                  onClick={() => setSortOpen((prev) => !prev)}
                  className={`
                    group relative isolate
                    flex min-w-52
                    items-center justify-between gap-4
                    overflow-hidden
                    rounded-xl
                    border px-4 py-2.5
                    text-sm font-medium
                    shadow-lg shadow-black/10
                    backdrop-blur-xl
                    transition-all duration-300
                    ${
                      sortOpen
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 ring-4 ring-emerald-400/5"
                        : "border-white/10 bg-white/4.5 text-white/60 hover:border-white/15 hover:bg-white/[0.07]"
                    }
                  `}
                >
                  <span className="relative z-10">{selectedSort}</span>

                  <ChevronDown
                    className={`
                      relative z-10 size-4
                      transition-transform duration-300
                      ${
                        sortOpen
                          ? "rotate-180 text-emerald-300"
                          : "text-white/40"
                      }
                    `}
                  />

                  {/* Shine */}
                  <span
                    className="
                      pointer-events-none absolute inset-y-0 -left-full
                      w-1/2 skew-x-[-18deg]
                      bg-linear-to-r
                      from-transparent via-white/8 to-transparent
                      opacity-0
                      transition-[left,opacity]
                      duration-600
                      group-hover:left-[150%]
                      group-hover:opacity-100
                    "
                  />
                </button>

                {/* Sort dropdown */}
                {sortOpen && (
                  <div
                    className="
                      absolute right-0 z-50 mt-2
                      w-full min-w-52
                      overflow-hidden
                      rounded-2xl
                      border border-white/10
                      bg-[#071f17]/95
                      p-1.5
                      shadow-2xl shadow-black/40
                      backdrop-blur-2xl
                      animate-[dropdownEnter_.2s_cubic-bezier(.16,1,.3,1)]
                    "
                  >
                    {sortOptions.map((option) => {
                      const isSelected = sort === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            updateFilter("sort", option.value);
                            setSortOpen(false);
                          }}
                          className={`
                            flex w-full items-center
                            justify-between
                            rounded-xl
                            px-3 py-2.5
                            text-left text-sm
                            transition-all duration-200
                            ${
                              isSelected
                                ? "bg-linear-to-r from-emerald-500/20 to-emerald-400/10 text-emerald-200"
                                : "text-white/55 hover:bg-white/6 hover:text-white"
                            }
                          `}
                        >
                          <span>{option.label}</span>

                          {isSelected && (
                            <Check className="size-4 text-emerald-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* PRODUCT CONTENT */}

            {loading ? (
              <div
                className="
                  flex min-h-72
                  items-center justify-center
                  rounded-3xl
                  border border-white/10
                  bg-white/2.5
                  backdrop-blur-xl
                "
              >
                <Loading />
              </div>
            ) : products.length === 0 ? (
              /* Empty state */
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
                <div
                  className="
                    pointer-events-none absolute
                    left-1/2 top-0
                    size-64
                    -translate-x-1/2
                    rounded-full
                    bg-emerald-400/7
                    blur-[100px]
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
                      border border-emerald-300/10
                      bg-emerald-400/10
                      shadow-[0_0_40px_rgba(52,211,153,0.08)]
                    "
                  >
                    <SlidersHorizontal className="size-8 text-emerald-300" />
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    No products found
                  </h2>

                  <p className="mt-2 text-sm text-white/40">
                    Try changing your filters or searching for something else.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilers}
                    className="
                      group relative mt-7
                      overflow-hidden
                      rounded-xl
                      border border-emerald-400/20
                      bg-emerald-400/10
                      px-5 py-2.5
                      text-sm font-semibold
                      text-emerald-200
                      shadow-lg shadow-emerald-950/10
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:border-emerald-300/30
                      hover:bg-emerald-400/15
                      hover:shadow-emerald-900/20
                    "
                  >
                    <span
                      className="
                        pointer-events-none absolute inset-y-0 -left-full
                        w-1/2 skew-x-[-18deg]
                        bg-linear-to-r
                        from-transparent via-white/10 to-transparent
                        opacity-0
                        transition-[left,opacity]
                        duration-600
                        group-hover:left-[150%]
                        group-hover:opacity-100
                      "
                    />

                    <span className="relative z-10">Clear Filters</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Products grid */
              <div
                className="
                  grid grid-cols-2
                  gap-4
                  sm:grid-cols-3
                  md:grid-cols-4
                  lg:grid-cols-4
                  xl:grid-cols-5
                  xl:gap-6
                "
              >
                {products.map(
                  (product, index) =>
                    product.stock > 0 && (
                      <div
                        key={product._id}
                        className="
                          animate-[productReveal_.55s_cubic-bezier(.16,1,.3,1)_both]
                        "
                        style={{
                          animationDelay: `${index * 45}ms`,
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ),
                )}
              </div>
            )}

            {/* PAGINATION */}

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const currentPage = i + 1;
                  const isActive = page === currentPage;

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        updateFilter("page", String(currentPage));
                        scrollTo(0, 0);
                      }}
                      className={`
                        flex size-10 items-center justify-center
                        rounded-xl
                        border
                        text-sm font-semibold
                        transition-all duration-300
                        ${
                          isActive
                            ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-200 shadow-lg shadow-emerald-950/20"
                            : "border-white/10 bg-white/[0.035] text-white/40 hover:border-white/15 hover:bg-white/6 hover:text-white"
                        }
                      `}
                    >
                      {currentPage}
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MOBILE FILTER SHEET */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">
          {/* Backdrop */}
          <div
            className="
              absolute inset-0
              bg-black/60
              backdrop-blur-sm
              animate-[overlayEnter_.25s_ease-out]
            "
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Sheet */}
          <div
            className="
              absolute inset-x-0 bottom-0
              max-h-[88vh]
              overflow-y-auto
              rounded-t-4xl
              border-t border-white/10
              bg-[#061f17]/95
              shadow-[0_-20px_80px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
              animate-[sheetEnter_.35s_cubic-bezier(.16,1,.3,1)]
            "
          >
            {/* Handle */}
            <div className="flex justify-center pt-3">
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>

            {/* Header */}
            <div
              className="
                flex items-center justify-between
                border-b border-white/10
                px-5 py-4
              "
            >
              <div>
                <p
                  className="
                    text-[10px] font-bold
                    uppercase tracking-[0.2em]
                    text-emerald-300/70
                  "
                >
                  Refine
                </p>

                <h3 className="mt-0.5 text-lg font-bold text-white">Filters</h3>
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="
                  flex size-9 items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/4.5
                  text-white/50
                  transition-all duration-200
                  hover:bg-white/8
                  hover:text-white
                "
              >
                <XIcon className="size-4" />
              </button>
            </div>

            {/* Filter content */}
            <div className="p-4 sm:p-5">
              <FilterPanel
                categories={categoriesData}
                category={category}
                updateFilter={updateFilter}
                clearFilers={clearFilers}
                hasFilter={hasFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
                organic={organic}
              />
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM FADE */}

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

      {/* ANIMATIONS */}

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

        @keyframes productReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes dropdownEnter {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes overlayEnter {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes sheetEnter {
          from {
            opacity: 0;
            transform: translateY(100%);
          }

          to {
            opacity: 1;
            transform: translateY(0);
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

export default Products;
