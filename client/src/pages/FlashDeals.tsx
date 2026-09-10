import { useEffect, useState } from "react";
import type { Product } from "../types";
import { dummyProducts } from "../assets/assets";
import { Zap, Sparkles } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

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
    <div className="min-h-screen overflow-hidden bg-app-cream">
      {/* Banner */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-orange-600 via-app-orange to-amber-400 py-6 sm:py-8 lg:py-10">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-yellow-300/30 blur-3xl animate-pulse" />

        <div className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-red-500/30 blur-3xl animate-pulse" />

        {/* Floating decorative circles */}
        <div className="pointer-events-none absolute left-[12%] top-[25%] size-3 rounded-full bg-yellow-200/80 animate-bounce" />

        <div className="pointer-events-none absolute right-[15%] top-[30%] size-2 rounded-full bg-white/80 animate-ping" />

        <div className="pointer-events-none absolute bottom-[20%] left-[20%] size-2 rounded-full bg-white/60 animate-pulse" />

        {/* Main content */}
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {/* Top badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-xl">
            <Sparkles className="size-4 animate-pulse" />
            Limited Time Offers
            <Sparkles className="size-4 animate-pulse" />
          </div>

          {/* Heading */}
          <div className="mb-5 flex items-center justify-center gap-3 sm:gap-5">
            <Zap className="size-8 fill-yellow-300 text-yellow-200 drop-shadow-[0_0_12px_rgba(255,255,0,0.8)] sm:size-12 lg:size-14 animate-pulse" />

            <h1 className="font-serif text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Flash Deals
            </h1>

            <Zap className="size-8 fill-yellow-300 text-yellow-200 drop-shadow-[0_0_12px_rgba(255,255,0,0.8)] sm:size-12 lg:size-14 animate-pulse" />
          </div>

          {/* Description */}
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
            Grab incredible deals before they're gone.
            <br className="hidden sm:block" />
            Shop now and save{" "}
            <span className="font-bold text-yellow-200">up to 50% off!</span>
          </p>

          {/* Glass stats */}
          <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 shadow-xl backdrop-blur-xl sm:gap-6 sm:px-7">
            <div className="text-center">
              <p className="text-xl font-bold text-white">{products.length}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/70 sm:text-xs">
                Deals
              </p>
            </div>

            <div className="h-8 w-px bg-white/20" />

            <div className="flex items-center gap-2 text-center">
              <Zap className="size-4 fill-yellow-300 text-yellow-200" />
              <div>
                <p className="text-sm font-bold text-white sm:text-base">
                  Up to 50%
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/70 sm:text-xs">
                  Savings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom glass shine */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/60 to-transparent" />
      </section>

      {/* Products */}
      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-orange-400 to-app-orange shadow-md shadow-orange-500/20">
                <Zap className="size-4 fill-yellow-200 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-app-green sm:text-3xl">
                Today's Hot Deals
              </h2>
            </div>

            <p className="text-sm text-app-text-light">
              Don't miss these limited-time offers.
            </p>
          </div>

          {/* Deal count */}
          {!loading && products.length > 0 && (
            <div className="hidden rounded-full border border-orange-200 bg-white/60 px-4 py-2 text-xs font-semibold text-app-orange shadow-sm backdrop-blur-md sm:block">
              {products.length} deals available
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-10">
            <Loading />
          </div>
        ) : products.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 px-6 py-20 text-center shadow-xl shadow-orange-900/5 backdrop-blur-xl">
            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 size-48 -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-3xl bg-linear-to-br from-orange-100 to-amber-50 shadow-inner">
                <Zap className="size-10 text-app-orange" />
              </div>

              <h2 className="mb-2 text-2xl font-bold text-app-green">
                No Deals Available
              </h2>

              <p className="text-sm text-app-text-light">
                Check back soon for amazing deals!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 xl:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="animate-[fadeIn_0.5s_ease-out_both]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FlashDeals;
