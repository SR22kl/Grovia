import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Product } from "../types";
import { categoriesData, dummyProducts } from "../assets/assets";
import {
  Check,
  ChevronDown,
  Home,
  SlidersHorizontal,
  X,
  XIcon,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";

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
    { value: "price-asc", label: "Price: Low ➡️ High" },
    { value: "price-desc", label: "Price: High ➡️ Low" },
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
    <>
      <div className="min-h-screen bg-app-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
            <Link to={"/"}>
              <Home className="size-5" />
            </Link>
            <span>/</span>
            <span className="text-app-green font-medium">
              {activeCategory ? activeCategory.name : "All Products"}
            </span>
          </nav>
          <div className="flex gap-8 xl:gap-10">
            {/* Category Filter Sidebar - Desktop  */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
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
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-semibold text-2xl text-app-green">
                    {activeCategory ? activeCategory?.name : "All Products"}
                  </h1>
                  <p className="text-sm text-app-text-light mt-1">
                    {products.length} Products Found
                  </p>
                </div>
                <div className="flex flex-col lg:items-center gap-3">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="group relative lg:hidden flex gap-2 overflow-hidden rounded-xl border border-emerald-700/20 bg-linear-to-r from-emerald-50 via-white to-green-50 px-4 py-2.5 text-sm font-semibold text-app-green shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-900/10 active:translate-y-0 active:scale-[0.98]"
                  >
                    {/* Hover Gradient */}
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-app-green via-emerald-700 to-green-600 transition-transform duration-500 group-hover:translate-x-0" />

                    {/* Content */}
                    <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                      <SlidersHorizontal className="size-5 transition-transform duration-300 group-hover:rotate-12" />
                      Filters
                    </span>
                  </button>

                  {/* Sort */}
                  <div ref={sortRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setSortOpen((prev) => !prev)}
                      className={`group relative flex min-w-48 items-center justify-between gap-3 overflow-hidden rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm backdrop-blur-xl transition-all duration-300 ${
                        sortOpen
                          ? "border-emerald-500 bg-green-50 shadow-md shadow-emerald-900/10 ring-4 ring-emerald-500/10"
                          : "border-white/80 bg-white/75 hover:bg-white/90 hover:shadow-md hover:shadow-emerald-900/10"
                      }`}
                    >
                      <span className="text-app-green">{selectedSort}</span>

                      <ChevronDown
                        className={`size-4 text-app-green transition-transform duration-300 ${
                          sortOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {sortOpen && (
                      <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/70 bg-green-100/80 p-1.5 shadow-xl shadow-emerald-950/10 backdrop-blur-xl">
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
                              className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                                isSelected
                                  ? "bg-linear-to-r from-app-green to-emerald-700 text-white shadow-sm"
                                  : "text-app-text-light hover:bg-emerald-50 hover:text-app-green"
                              }`}
                            >
                              <span>{option.label}</span>

                              {isSelected && <Check className="size-4" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <Loading />
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-semibold text-2xl text-app-green mb-2">
                    No products found
                  </p>
                  <p className="text-sm text-app-text-light mt-4">
                    Try changing your filters or searching for something else
                  </p>
                  <button
                    onClick={clearFilers}
                    className="bg-white text-app-green hover:bg-orange-100 font-semibold px-6 py-2 rounded-xl flex-center gap-2 mt-8 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 xl:gap-8">
                  {products.map(
                    (product) =>
                      product.stock > 0 && (
                        <ProductCard key={product._id} product={product} />
                      ),
                  )}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex-center mt-16">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        (updateFilter("page", String(i + 1)), scrollTo(0, 0));
                      }}
                      className={`size-9 rounded-lg text-sm font-medium transition-all ${page === i + 1 ? "bg-app-green text-white" : "text-app-text-light hover:bg-app-cream"}`}
                    >
                      <span>{i + 1}</span>
                    </button>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Mobile Filters modal */}
        {mobileFiltersOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-in-up">
                <div className="flex items-center justify-between p-4 border-b border-app-border">
                  <h3 className="text-lg font-semibold text-app-green">
                    Filters
                  </h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-app-cream rounded-lg"
                  >
                    <XIcon className="size-5" />
                  </button>
                </div>
                <div className="p-4">
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
          </>
        )}
      </div>
    </>
  );
};

export default Products;
