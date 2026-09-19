import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { useEffect, useState } from "react";
import { dummyProducts } from "../assets/assets";
import Loading from "../components/Loading";
import {
  ArrowLeft,
  ArrowRightIcon,
  Home,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import StarRating from "../components/StarRating";
import DummyReviewsSection from "../assets/DummyReviewsSection";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const { id } = useParams();
  const navigate = useNavigate();

  const { items, addToCart, removeFromCart, updateQuantity } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);

    window.scrollTo(0, 0);

    const foundProduct = dummyProducts.find((p) => p._id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
    }

    setRelatedProducts(dummyProducts.filter((p) => p._id !== id));

    setLoading(false);
  }, [id]);

  /* --------------------------------
     Loading
  -------------------------------- */
  if (loading) {
    return <Loading />;
  }

  /* --------------------------------
     Product not found
  -------------------------------- */
  if (!product) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#031c14] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

          <div
            className="
               pointer-events-none absolute inset-0
               opacity-[0.035]
               [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
               [background-size:72px_72px]
            "
          />
        </div>

        <section className="animate-[pageReveal_.5s_cubic-bezier(.16,1,.3,1)] mt-8">
          <Navbar />
        </section>

        <main className="relative flex min-h-[calc(100vh-100px)] items-center justify-center px-4">
          <div
            className="
              relative isolate overflow-hidden
              rounded-3xl
              border border-white/10
              bg-white/[0.035]
              px-8 py-12
              text-center
              shadow-2xl shadow-black/20
              backdrop-blur-2xl
            "
          >
            <div
              className="
                pointer-events-none absolute inset-y-0 left-[-120%]
                z-20 w-[70%] skew-x-[-18deg]
                bg-linear-to-r from-transparent via-white/8 to-transparent
                opacity-0
                transition-[left,opacity]
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:left-[150%]
                group-hover:opacity-100
              "
            />

            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
              <ShoppingCartIcon className="size-7 text-emerald-300" />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Product not found
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
              The product you're looking for may have been removed or is no
              longer available.
            </p>

            <Link
              to="/products"
              className="
                mt-7 inline-flex items-center gap-2
                rounded-xl
                border border-emerald-300/20
                bg-emerald-400/10
                px-5 py-2.5
                text-sm font-semibold
                text-emerald-200
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-emerald-300/30
                hover:bg-emerald-400/15
              "
            >
              <ArrowLeft className="size-4" />
              Back to Products
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Cart
  const cartItem = items.find((item) => item.product._id === product._id);

  const inCart = !!cartItem;

  const displayQuantity = inCart ? cartItem.quantity : localQuantity;

  /* Category */
  const categoryLabel = product.category.replace(/-/g, " ");

  /* Quantity handlers */
  const handleDecrement = () => {
    if (inCart) {
      if (cartItem.quantity > 1) {
        updateQuantity(product._id, cartItem.quantity - 1);
      } else {
        removeFromCart(product._id);
      }
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  const handleIncrement = () => {
    if (inCart) {
      updateQuantity(product._id, cartItem.quantity + 1);
    } else {
      setLocalQuantity(localQuantity + 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031c14] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0  overflow-hidden">
        {/* AMBIENT GLOWS */}

        {/* Large emerald glow — top left */}
        <div
          className="
          absolute
          -left-56
          top-24
          size-170
          rounded-full
          bg-emerald-500/40
          blur-[130px]
        "
        />

        {/* Teal glow — right side */}
        <div
          className="
          absolute
          -right-56
          top-[30%]
          size-180
          rounded-full
          bg-teal-400/40
          blur-[130px]
        "
        />

        {/* Orange glow — bottom */}
        <div
          className="
          absolute
          -bottom-70
          left-[32%]
          size-130
          rounded-full
          bg-orange-400/25
          blur-[130px]
        "
        />

        {/* Smaller emerald highlight */}
        <div
          className="
          absolute
          left-[38%]
          top-[18%]
          size-65
          rounded-full
          bg-emerald-300/20
          blur-[100px]
        "
        />
        {/* GRID */}

        <div
          className="
          absolute
          inset-0
          opacity-[0.075]
          [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
        />

        {/* GRID FADE */}
        <div
          className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,#031c14_90%)]
          opacity-60
        "
        />

        {/* TOP GLOSS */}

        <div
          className="
          absolute
          inset-x-0
          top-0
          h-64
          bg-linear-to-b
          from-white/[0.035]
          via-transparent
          to-transparent
        "
        />
      </div>

      {/* NAVBAR */}
      <section className="animate-[pageReveal_.5s_cubic-bezier(.16,1,.3,1)] mt-8">
        <Navbar />
      </section>
      <main className="relative mx-auto max-w-7xl px-4 pb-32 pt-5 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}

        <nav
          className="
            mb-4 flex items-center gap-2
            overflow-hidden
            rounded-2xl
            border border-white/8
            bg-white/2.5
            px-3 py-2
            text-xs
            text-white/40
            backdrop-blur-xl
            sm:w-fit
          "
        >
          <Link
            to="/"
            className="
              flex size-8 shrink-0 items-center justify-center
              rounded-xl
              border border-white/10
              bg-white/[0.035]
              text-white/45
              transition-all duration-300
              hover:border-emerald-300/20
              hover:bg-emerald-400/10
              hover:text-emerald-200
            "
          >
            <Home className="size-3.5" />
          </Link>

          <span className="text-white/15">/</span>

          <Link
            to="/products"
            className="
              shrink-0
              transition-colors duration-200
              hover:text-emerald-200
            "
          >
            Products
          </Link>

          <span className="text-white/15">/</span>

          <Link
            to={`/products?category=${product.category}`}
            className="
              shrink-0 capitalize
              transition-colors duration-200
              hover:text-emerald-200
            "
          >
            {categoryLabel}
          </Link>

          <span className="text-white/15">/</span>

          <span className="truncate font-medium text-emerald-300/80">
            {product.name}
          </span>
        </nav>

        {/* =======================================================
            BACK BUTTON
        ======================================================= */}
        <button
          onClick={() => navigate(-1)}
          className="
            group mb-6
            flex items-center gap-2
            rounded-xl
            border border-transparent
            px-3 py-2
            text-sm text-white/45
            transition-all duration-300
            hover:border-white/8
            hover:bg-white/[0.035]
            hover:text-white/80
          "
        >
          <ArrowLeft
            className="
              size-4
              transition-transform duration-300
              group-hover:-translate-x-1
            "
          />
          Back
        </button>

        {/* =======================================================
            MAIN PRODUCT SHOWCASE
        ======================================================= */}
        <section
          className="
            group/showcase relative isolate
            overflow-hidden
            rounded-4xl
            border border-white/10
            bg-white/[0.035]
            shadow-[0_30px_100px_rgba(0,0,0,0.25)]
            backdrop-blur-2xl
          "
        >
          {/* Exact Grovia glass shine */}
          <div
            className="
              pointer-events-none absolute inset-y-0 left-[-120%]
              z-30 w-[70%] skew-x-[-18deg]
              bg-linear-to-r
              from-transparent
              via-white/8
              to-transparent
              opacity-0
              transition-[left,opacity]
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover/showcase:left-[150%]
              group-hover/showcase:opacity-100
            "
          />

          {/* Ambient card glows */}
          <div
            className="
              pointer-events-none absolute
              -left-32 -top-32
              size-96
              rounded-full
              bg-emerald-400/[0.07]
              blur-[100px]
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-32 -right-32
              size-96
              rounded-full
              bg-orange-400/5
              blur-[100px]
            "
          />

          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* =================================================
                LEFT — PRODUCT IMAGE
            ================================================= */}
            <div
              className="
                group/image relative
                flex min-h-105
                items-center justify-center
                overflow-hidden
                border-b border-white/8
                bg-linear-to-br
                from-white/4.5
                via-transparent
                to-emerald-400/2.5
                p-8
                sm:min-h-130
                sm:p-12
                lg:min-h-162.5
                lg:border-b-0
                lg:border-r
              "
            >
              {/* Inner image glow */}
              <div
                className="
                  pointer-events-none absolute
                  size-72
                  rounded-full
                  bg-emerald-400/9
                  blur-[80px]
                  transition-all duration-700
                  group-hover/image:scale-125
                  group-hover/image:bg-emerald-400/13
                "
              />

              <div
                className="
                  pointer-events-none absolute
                  bottom-12 right-10
                  size-36
                  rounded-full
                  border border-orange-300/8
                  transition-transform duration-700
                  group-hover/image:scale-110
                "
              />

              {/* Decorative rings */}
              <div
                className="
                  pointer-events-none absolute
                  size-90
                  rounded-full
                  border border-white/[0.035]
                "
              />

              <div
                className="
                  pointer-events-none absolute
                  size-67.5
                  rounded-full
                  border border-emerald-300/[0.035]
                "
              />

              {/* Product image */}
              <img
                src={product.image}
                alt={product.name}
                className="
                  relative z-10
                  max-h-82.5
                  w-auto
                  max-w-[85%]
                  object-contain
                  drop-shadow-[0_30px_35px_rgba(0,0,0,0.35)]
                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover/image:scale-[1.06]
                  group-hover/image:-translate-y-2
                "
              />

              {/* Product badges */}
              <div
                className="
                  absolute left-5 top-5 z-20
                  flex flex-wrap gap-2
                  sm:left-7 sm:top-7
                "
              >
                {product.isOrganic && (
                  <span
                    className="
                      flex items-center gap-1.5
                      rounded-full
                      border border-emerald-300/20
                      bg-emerald-400/10
                      px-3 py-1.5
                      text-xs font-semibold
                      text-emerald-200
                      shadow-lg shadow-black/10
                      backdrop-blur-xl
                    "
                  >
                    <LeafIcon className="size-3.5" />
                    Organic
                  </span>
                )}

                {product.discount > 0 && (
                  <span
                    className="
                      rounded-full
                      border border-orange-300/20
                      bg-orange-400/10
                      px-3 py-1.5
                      text-xs font-semibold
                      text-orange-200
                      shadow-lg shadow-black/10
                      backdrop-blur-xl
                    "
                  >
                    {product.discount}% Off
                  </span>
                )}
              </div>

              {/* Bottom image label */}
              <div
                className="
                  absolute bottom-6 left-1/2 z-20
                  -translate-x-1/2 translate-y-3
                  rounded-full
                  border border-white/10
                  bg-[#061f17]/70
                  px-4 py-2
                  text-xs font-medium
                  text-white/55
                  opacity-0
                  shadow-xl shadow-black/20
                  backdrop-blur-xl
                  transition-all duration-500
                  group-hover/image:translate-y-0
                  group-hover/image:opacity-100
                "
              >
                Premium Quality
              </div>
            </div>

            {/* =================================================
                RIGHT — PRODUCT INFORMATION
            ================================================= */}
            <div
              className="
                relative flex flex-col justify-center
                bg-[#061f17]/45
                p-6
                sm:p-8
                lg:p-12
              "
            >
              {/* Category */}
              <Link
                to={`/products?category=${product.category}`}
                className="
                  mb-4 w-fit
                  rounded-full
                  border border-emerald-300/15
                  bg-emerald-400/6
                  px-3 py-1.5
                  text-[10px] font-bold
                  uppercase tracking-[0.18em]
                  text-emerald-300/80
                  transition-all duration-300
                  hover:border-emerald-300/25
                  hover:bg-emerald-400/10
                  hover:text-emerald-200
                "
              >
                {categoryLabel}
              </Link>

              {/* Product name */}
              <h1
                className="
                  max-w-2xl
                  text-3xl
                  font-semibold
                  leading-[1.1]
                  tracking-tight
                  text-white
                  sm:text-4xl
                  lg:text-[2.8rem]
                  xl:text-5xl
                "
              >
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div
                    className="
                      flex items-center gap-2
                      rounded-xl
                      border border-yellow-300/15
                      bg-yellow-400/6
                      px-3 py-2
                      backdrop-blur-xl
                    "
                  >
                    <StarRating rating={product.rating} size={15} />

                    <span className="text-sm font-semibold text-white/85">
                      {product.rating}
                    </span>
                  </div>

                  <span className="text-sm text-white/35">
                    {product.reviewCount} reviews
                  </span>
                </div>
              )}

              {/* Divider */}
              <div
                className="
                  my-7 h-px w-full
                  bg-linear-to-r
                  from-emerald-300/15
                  via-white/5
                  to-transparent
                "
              />

              {/* Price */}
              <div className="flex flex-wrap items-end gap-3">
                <span
                  className="
                    bg-linear-to-r
                    from-emerald-300
                    via-emerald-200
                    to-teal-300
                    bg-clip-text
                    text-3xl
                    font-bold
                    tracking-tight
                    text-transparent
                    sm:text-4xl
                  "
                >
                  {currency}
                  {product.price.toFixed(2)}
                </span>

                {product.originalPrice > 0 && (
                  <span className="mb-1 text-sm font-medium text-white/30 line-through sm:text-base">
                    {currency}
                    {product.originalPrice.toFixed(2)}
                  </span>
                )}

                {product.discount > 0 && (
                  <span
                    className="
                      mb-1
                      rounded-lg
                      border border-orange-300/15
                      bg-orange-400/[0.07]
                      px-2 py-1
                      text-xs font-semibold
                      text-orange-200/80
                    "
                  >
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className="
                  mt-5 max-w-xl
                  text-sm leading-7
                  text-white/45
                  sm:text-[15px]
                "
              >
                {product.description}
              </p>

              {/* Stock */}
              <div className="mt-6">
                {product.stock > 0 ? (
                  <div
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      border border-emerald-300/15
                      bg-emerald-400/6
                      px-3 py-1.5
                      text-xs font-medium
                      text-emerald-200
                      backdrop-blur-xl
                    "
                  >
                    <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                    In stock · {product.stock} left
                  </div>
                ) : (
                  <div
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      border border-red-300/15
                      bg-red-400/6
                      px-3 py-1.5
                      text-xs font-medium
                      text-red-200
                      backdrop-blur-xl
                    "
                  >
                    <span className="size-2 rounded-full bg-red-400" />
                    Out of stock
                  </div>
                )}
              </div>

              {/* Quantity + Add to cart */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {/* Quantity */}
                {inCart && (
                  <div
                    className="
                      flex h-13.5 shrink-0 items-center
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.035]
                      p-1
                      backdrop-blur-xl
                    "
                  >
                    <button
                      onClick={handleDecrement}
                      className="
                        flex size-11 items-center justify-center
                        rounded-xl
                        text-white/45
                        transition-all duration-200
                        hover:bg-emerald-400/10
                        hover:text-emerald-200
                        active:scale-90
                      "
                    >
                      <MinusIcon className="size-4" />
                    </button>

                    <span
                      className="
                        flex min-w-12 items-center justify-center
                        text-sm font-bold
                        text-white
                      "
                    >
                      {displayQuantity}
                    </span>

                    <button
                      onClick={handleIncrement}
                      className="
                        flex size-11 items-center justify-center
                        rounded-xl
                        text-white/45
                        transition-all duration-200
                        hover:bg-emerald-400/10
                        hover:text-emerald-200
                        active:scale-90
                      "
                    >
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                )}

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    if (!inCart) {
                      addToCart(product, localQuantity);
                    }
                  }}
                  disabled={product.stock <= 0}
                  className={`
                    group/cart relative
                    flex h-13.5 flex-1
                    items-center justify-center gap-2
                    overflow-hidden
                    rounded-2xl
                    px-6
                    font-semibold
                    transition-all duration-300
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-40

                    ${
                      inCart
                        ? `
                          border border-emerald-300/20
                          bg-emerald-400/10
                          text-emerald-200
                          hover:bg-emerald-400/15
                        `
                        : `
                          border border-orange-300/20
                          bg-linear-to-r
                          from-orange-400
                          to-orange-500
                          text-white
                          shadow-[0_12px_35px_rgba(249,115,22,0.16)]
                          hover:-translate-y-0.5
                          hover:shadow-[0_18px_45px_rgba(249,115,22,0.22)]
                        `
                    }
                  `}
                >
                  {!inCart && (
                    <span
                      className="
                        pointer-events-none absolute inset-y-0 left-[-120%]
                        w-[55%] skew-x-[-18deg]
                        bg-linear-to-r
                        from-transparent
                        via-white/20
                        to-transparent
                        transition-[left]
                        duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover/cart:left-[140%]
                      "
                    />
                  )}

                  <ShoppingCartIcon
                    className="
                      relative size-5
                      transition-transform duration-300
                      group-hover/cart:scale-110
                      group-hover/cart:-rotate-3
                    "
                  />

                  <span className="relative">
                    {inCart ? "Added to Cart" : "Add to Cart"}
                  </span>
                </button>
              </div>

              {/* Trust indicators */}
              <div
                className="
                  mt-7 grid grid-cols-3
                  overflow-hidden
                  rounded-2xl
                  border border-white/8
                  bg-white/2.5
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex flex-col items-center justify-center
                    gap-1 px-2 py-4
                    text-center
                  "
                >
                  <ShieldCheck className="size-4 text-emerald-300/70" />
                  <p className="text-[11px] font-semibold text-white/70">
                    Quality
                  </p>
                  <p className="text-[9px] text-white/30">Guaranteed</p>
                </div>

                <div
                  className="
                    flex flex-col items-center justify-center
                    gap-1 border-x border-white/8
                    px-2 py-4
                    text-center
                  "
                >
                  <Sparkles className="size-4 text-orange-300/70" />
                  <p className="text-[11px] font-semibold text-white/70">
                    Fresh
                  </p>
                  <p className="text-[9px] text-white/30">Carefully packed</p>
                </div>

                <div
                  className="
                    flex flex-col items-center justify-center
                    gap-1 px-2 py-4
                    text-center
                  "
                >
                  <Truck className="size-4 text-emerald-300/70" />
                  <p className="text-[11px] font-semibold text-white/70">
                    Secure
                  </p>
                  <p className="text-[9px] text-white/30">Easy checkout</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            CUSTOMER REVIEWS
        ======================================================= */}
        {product.reviewCount > 0 && (
          <section className="mt-14">
            <DummyReviewsSection product={product} />
          </section>
        )}

        {/* =======================================================
            RELATED PRODUCTS
        ======================================================= */}
        {relatedProducts.length > 0 && (
          <section className="mb-20 mt-16">
            {/* Section heading */}
            <div
              className="
                mb-7 flex flex-col gap-5
                sm:flex-row sm:items-end sm:justify-between
              "
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-8 rounded-full bg-orange-400" />

                  <span
                    className="
                      text-[10px] font-bold
                      uppercase tracking-[0.18em]
                      text-orange-300/75
                    "
                  >
                    You may also like
                  </span>
                </div>

                <h2
                  className="
                    text-2xl font-semibold
                    tracking-tight text-white
                    sm:text-3xl
                  "
                >
                  Related Products
                </h2>

                <p className="mt-1.5 text-sm text-white/35">
                  More from {categoryLabel}
                </p>
              </div>

              {/* View all */}
              <Link
                to={`/products?category=${product.category}`}
                onClick={() => scrollTo(0, 0)}
                className="
                  group
                  flex w-fit items-center gap-1.5
                  rounded-xl
                  border border-orange-300/15
                  bg-orange-400/5
                  px-4 py-2.5
                  text-sm font-medium
                  text-orange-200/80
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-orange-300/25
                  hover:bg-orange-400/10
                  hover:text-orange-100
                "
              >
                View All
                <ArrowRightIcon
                  className="
                    size-4
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>

            {/* Products */}
            <div
              className="
                grid grid-cols-2
                gap-4
                sm:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                xl:gap-6
              "
            >
              {relatedProducts.slice(0, 5).map((rp) => (
                <ProductCard key={rp._id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </main>
      {/* =========================================================
          PAGE ANIMATIONS
      ========================================================= */}
      <style>{`
        @keyframes productPageReveal {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes productFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .product-page-enter {
          animation:
            productPageReveal
            .7s
            cubic-bezier(.16,1,.3,1)
            both;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
