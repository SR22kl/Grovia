import { useEffect, useState } from "react";
import type { Product } from "../types";
import { Link, useSearchParams } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { Home, SearchIcon } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

const SearchResults = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setProducts(
      dummyProducts.filter((p) =>
        p?.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    setLoading(false);
  }, [query]);
  return (
    <>
      <div className="min-h-screen bg-app-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
            <Link to={"/"}>
              <Home className="size-5" />
            </Link>
            <span>/</span>
            <span className="text-app-green font-medium">Search Results</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl font-bold text-app-green mb-2">
              Results for "{query}"
            </h1>
            <p className="text-sm text-app-text-light">
              {loading ? "Serching..." : `${products.length} products found"`}
            </p>
          </div>

          {/* Results */}
          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <SearchIcon className="size-16 mx-auto text-app-border mb-2" />
              <h2 className="font-semibold text-2xl text-app-green mb-2">
                No results found!
              </h2>
              <p className="text-sm text-app-text-light mx-auto max-w-md mb-4">
                We could't find any products matching "{query}". Try searching
                something else.
              </p>
              <Link
                to="/products"
                className="inline-flex px-5 py-2.5 bg-app-green text-white text-sm font-medium rounded-lg"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
