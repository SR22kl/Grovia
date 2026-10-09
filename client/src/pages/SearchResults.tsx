import { useEffect, useState } from "react";
import type { Product } from "../types";
import { Link, useSearchParams } from "react-router-dom";
import {
  Home,
  SearchIcon,
  ArrowRightIcon,
  PackageSearchIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import api from "../config/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const SearchResults = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await api.get(
          `/products?search=${encodeURIComponent(query.trim())}`,
        );

        if (!cancelled) {
          setProducts(res.data.products);
        }
      } catch (error: any) {
        if (!cancelled) {
          console.error(error);
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Failed to fetch search results.",
          );
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031c14] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Emerald Glow */}
        <div className="absolute -left-56 top-24 size-150 rounded-full bg-emerald-500/12 blur-[140px]" />

        {/* Teal Glow */}
        <div className="absolute -right-56 top-[28%] size-135 rounded-full bg-teal-400/9 blur-[140px]" />

        {/* Orange Glow */}
        <div className="absolute -bottom-65 left-[30%] size-125 rounded-full bg-orange-400/[0.07] blur-[140px]" />

        {/* Grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.055]
            [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#031c14_92%)] opacity-70" />

        {/* Top Gloss */}
        <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-white/[0.035] via-transparent to-transparent" />
      </div>

      {/* =========================================================
          PAGE CONTENT
      ========================================================= */}
      {/* Navbar */}
      <section className="animate-[homeReveal_.5s_cubic-bezier(.16,1,.3,1)] mt-8 ">
        <Navbar />
      </section>
      <main className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs sm:text-sm"
        >
          <Link
            to="/"
            aria-label="Home"
            className="
              flex size-8 items-center justify-center
              rounded-lg
              border border-white/10
              bg-white/[0.035]
              text-white/45
              transition-all duration-300
              hover:border-emerald-400/20
              hover:bg-emerald-400/6
              hover:text-emerald-300
            "
          >
            <Home className="size-4" />
          </Link>

          <span className="text-white/20">/</span>

          <span className="text-white/40">Search</span>

          <span className="text-white/20">/</span>

          <span className="max-w-45 truncate font-medium text-emerald-200/80 sm:max-w-xs">
            {query || "Search Results"}
          </span>
        </nav>

        {/* =======================================================
            SEARCH HERO
        ======================================================= */}
        <section
          className="
            group relative isolate overflow-hidden
            rounded-4xl
            border border-white/10
            bg-white/[0.035]
            p-5
            shadow-[0_25px_80px_rgba(0,0,0,0.2)]
            backdrop-blur-2xl
            sm:p-8
            lg:p-10
          "
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-emerald-400/9 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-24 left-[30%] size-48 rounded-full bg-orange-400/5 blur-[90px]" />

          {/* Glass Shine */}
          <div
            className="
              pointer-events-none absolute inset-y-0 left-[-120%]
              z-20 w-[55%] skew-x-[-18deg]
              bg-linear-to-r
              from-transparent
              via-white/6
              to-transparent
              opacity-0
              transition-[left,opacity]
              duration-1000
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:left-[150%]
              group-hover:opacity-100
            "
          />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-2">
                <div
                  className="
                    flex size-8 items-center justify-center
                    rounded-lg
                    border border-emerald-400/15
                    bg-emerald-400/[0.07]
                    text-emerald-300
                  "
                >
                  <SparklesIcon className="size-4" />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/60 sm:text-xs">
                  Discover Something Good
                </span>
              </div>

              <h1 className="wrap-break-word text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {query ? (
                  <>
                    Results for{" "}
                    <span className="bg-linear-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                      "{query}"
                    </span>
                  </>
                ) : (
                  "Find Your Favorites"
                )}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
                {loading
                  ? "Finding products that match your search..."
                  : query
                    ? `${products.length} ${
                        products.length === 1 ? "product" : "products"
                      } found matching your search.`
                    : "Search our catalog to discover fresh picks and everyday essentials."}
              </p>
            </div>

            {/* Result Count */}
            {!loading && query.trim() && (
              <div
                className="
                  flex w-fit shrink-0 items-center gap-3
                  rounded-2xl
                  border border-white/10
                  bg-black/10
                  px-4 py-3
                "
              >
                <div
                  className="
                    flex size-10 items-center justify-center
                    rounded-xl
                    border border-emerald-400/15
                    bg-emerald-400/6
                    text-emerald-300
                  "
                >
                  <PackageSearchIcon className="size-5" />
                </div>

                <div>
                  <p className="text-xl font-semibold text-white">
                    {products.length}
                  </p>

                  <p className="text-[10px] uppercase tracking-wider text-white/35">
                    Results
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =======================================================
            RESULTS
        ======================================================= */}
        <section className="mt-8 sm:mt-10">
          {loading ? (
            <div className="flex min-h-75 items-center justify-center">
              <Loading />
            </div>
          ) : !query.trim() ? (
            /* Empty Query */
            <div
              className="
                relative isolate overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/2.5
                px-5 py-16
                text-center
                backdrop-blur-xl
                sm:py-20
              "
            >
              <div
                className="
                  mx-auto mb-5
                  flex size-16 items-center justify-center
                  rounded-2xl
                  border border-emerald-400/15
                  bg-emerald-400/6
                  text-emerald-300/70
                "
              >
                <SearchIcon className="size-7" />
              </div>

              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                What are you looking for?
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/40">
                Enter a product name or keyword in the search bar to explore our
                catalog.
              </p>

              <Link
                to="/products"
                className="
                  group mt-6 inline-flex items-center gap-2
                  rounded-xl
                  border border-emerald-400/20
                  bg-emerald-400/10
                  px-5 py-2.5
                  text-sm font-medium
                  text-emerald-200
                  transition-all duration-300
                  hover:border-emerald-300/30
                  hover:bg-emerald-400/[0.14]
                "
              >
                Browse All Products
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ) : products.length === 0 ? (
            /* No Results */
            <div
              className="
                relative isolate overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/2.5
                px-5 py-16
                text-center
                backdrop-blur-xl
                sm:py-20
              "
            >
              <div
                className="
                  mx-auto mb-5
                  flex size-16 items-center justify-center
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.035]
                  text-white/25
                "
              >
                <SearchIcon className="size-7" />
              </div>

              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                No products found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
                We couldn't find any products matching{" "}
                <span className="font-medium text-emerald-200/80">
                  "{query}"
                </span>
                . Try another keyword or explore the full catalog.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl
                    border border-white/10
                    bg-white/[0.035]
                    px-5 py-2.5
                    text-sm font-medium
                    text-white/60
                    transition-all duration-300
                    hover:bg-white/6
                    hover:text-white
                  "
                >
                  <XIcon className="size-4" />
                  Go Back
                </button>

                <Link
                  to="/products"
                  className="
                    group inline-flex items-center justify-center gap-2
                    rounded-xl
                    border border-emerald-400/20
                    bg-emerald-400/10
                    px-5 py-2.5
                    text-sm font-medium
                    text-emerald-200
                    transition-all duration-300
                    hover:border-emerald-300/30
                    hover:bg-emerald-400/[0.14]
                  "
                >
                  Browse All Products
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ) : (
            /* Product Grid */
            <>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-white sm:text-lg">
                    Search Results
                  </h2>

                  <p className="mt-1 text-xs text-white/35">
                    Showing {products.length}{" "}
                    {products.length === 1 ? "product" : "products"}
                  </p>
                </div>

                <Link
                  to="/products"
                  className="
                    flex shrink-0 items-center gap-1.5
                    text-xs font-medium
                    text-emerald-300/70
                    transition-colors
                    hover:text-emerald-200
                  "
                >
                  View catalog
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>

              <div className="mt-15 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 ">
                {products.map((product) => (
                  <div key={product.id} className="min-w-0 mb-2">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <style>{`
        @keyframes searchProductEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SearchResults;
