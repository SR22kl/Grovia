import { useEffect, useState } from "react";
import { ArrowRightIcon, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import type { Product } from "../../types";
import { dummyProducts } from "../../assets/assets";
import ProductCard from "../ProductCard";

const PopProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(dummyProducts.slice(0, 10));
  }, []);

  return (
    <section className="relative py-14 sm:py-16">
      {/* HEADER */}

      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-6 bg-orange-300/60" />

            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300/75">
              <Sparkles className="size-3" />
              Customer Favorites
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Popular Products
          </h2>

          <p className="mt-1.5 text-xs text-white/35 sm:text-sm">
            Seasonal favorites, organic & more
          </p>
        </div>

        <Link
          to="/products"
          className="
            group
            flex shrink-0 items-center gap-1.5
            rounded-xl
            border border-white/10
            bg-white/5
            px-3.5 py-2.5
            text-xs font-semibold
            text-white/45
            backdrop-blur-xl
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-orange-300/20
            hover:bg-orange-300/6
            hover:text-orange-300
          "
        >
          View All
          <ArrowRightIcon
            className="
              size-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>

      {/* PRODUCT GRID */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="animate-[productReveal_.55s_cubic-bezier(.16,1,.3,1)]"
            style={{
              animationDelay: `${index * 60}ms`,
              animationFillMode: "both",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* ANIMATION */}

      <style>{`
        @keyframes productReveal {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

export default PopProducts;
