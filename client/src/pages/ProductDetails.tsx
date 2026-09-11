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
} from "lucide-react";
import StarRating from "../components/StarRating";
import DummyReviewsSection from "../assets/DummyReviewsSection";
import ProductCard from "../components/ProductCard";

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
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-app-text">
            Product not found
          </h2>

          <Link
            to="/products"
            className="
              mt-4 inline-flex items-center gap-2
              rounded-xl
              bg-app-green
              px-5 py-2.5
              font-medium text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            <ArrowLeft className="size-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // cart
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
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND AMBIENT GLOW */}
      <div
        className="
          pointer-events-none fixed
          left-0 top-32
          -z-10
          h-96 w-96
          rounded-full
          bg-green-200/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none fixed
          bottom-0 right-0
          -z-10
          h-96 w-96
          rounded-full
          bg-orange-200/20
          blur-3xl
        "
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <nav
          className="
            mb-2
            flex items-center gap-2
            overflow-hidden
            text-sm
            text-app-text-light
          "
        >
          <Link
            to="/"
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-full
              border border-white/60
              bg-white/50
              shadow-sm
              backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-0.5
              hover:text-app-green
              hover:shadow-md
            "
          >
            <Home className="size-4" />
          </Link>

          <span className="text-app-border">/</span>

          <Link
            to="/products"
            className="
              transition-colors duration-200
              hover:text-app-green
            "
          >
            Products
          </Link>

          <span className="text-app-border">/</span>

          <Link
            to={`/products?category=${product.category}`}
            className="
              capitalize
              transition-colors duration-200
              hover:text-app-green
            "
          >
            {categoryLabel}
          </Link>

          <span className="text-app-border">/</span>

          <span
            className="
              truncate
              font-medium
              text-app-green
            "
          >
            {product.name}
          </span>
        </nav>

        {/* =========================================
            BACK BUTTON
        ========================================= */}

        <button
          onClick={() => navigate(-1)}
          className="
            group
            mb-6
            flex items-center gap-2
            rounded-full
            px-2 py-1
            text-sm
            text-app-text-light
            transition-all duration-300
            hover:bg-white/50
            hover:text-app-green
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

        {/* =========================================
            PRODUCT DETAILS CARD
        ========================================= */}

        <div
          className="
            group/card
            relative
            overflow-hidden
            rounded-3xl
            border border-white/60
            bg-white/60
            shadow-[0_20px_60px_rgba(27,48,34,0.08)]
            backdrop-blur-xl
            transition-all duration-500
            hover:shadow-[0_25px_80px_rgba(27,48,34,0.12)]
          "
        >
          {/* Card ambient glows */}

          <div
            className="
              pointer-events-none
              absolute -left-24 -top-24
              h-64 w-64
              rounded-full
              bg-app-green/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute -bottom-24 -right-24
              h-64 w-64
              rounded-full
              bg-orange-300/10
              blur-3xl
            "
          />

          <div className="relative grid md:grid-cols-2">
            {/* =====================================
                LEFT — PRODUCT IMAGE
            ===================================== */}

            <div
              className="
                group/image
                relative
                flex
                min-h-100
                items-center
                justify-center
                overflow-hidden
                bg-linear-to-br
                from-white/70
                via-white/40
                to-green-50/40
                p-8
                md:min-h-130
                md:p-12
              "
            >
              {/* Image glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  h-64 w-64
                  rounded-full
                  bg-app-green/10
                  blur-3xl
                  transition-all duration-700
                  group-hover/image:scale-125
                  group-hover/image:bg-app-green/15
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute bottom-8 right-8
                  h-28 w-28
                  rounded-full
                  border border-orange-300/10
                  transition-transform duration-700
                  group-hover/image:scale-110
                "
              />

              {/* Product image */}
              <img
                src={product.image}
                alt={product.name}
                className="
                  relative z-10
                  max-h-90
                  w-auto
                  object-contain
                  drop-shadow-[0_25px_25px_rgba(27,48,34,0.15)]
                  transition-all
                  duration-700
                  ease-out
                  group-hover/image:scale-105
                  group-hover/image:-translate-y-2
                "
              />

              {/* PRODUCT BADGES */}
              <div
                className="
                  absolute left-5 top-5
                  z-20
                  flex flex-wrap gap-2
                "
              >
                {product.isOrganic && (
                  <span
                    className="
                      flex items-center gap-1.5
                      rounded-full
                      border border-green-300/40
                      bg-green-700/90
                      px-3 py-1.5
                      text-xs font-semibold
                      text-white
                      shadow-lg
                      shadow-green-900/10
                      backdrop-blur-md
                      transition-transform duration-300
                      hover:scale-105
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
                      border border-orange-200/50
                      bg-orange-400/90
                      px-3 py-1.5
                      text-xs font-semibold
                      text-white
                      shadow-lg
                      shadow-orange-900/10
                      backdrop-blur-md
                      transition-transform duration-300
                      hover:scale-105
                    "
                  >
                    {product.discount}% Off
                  </span>
                )}
              </div>

              {/* IMAGE HOVER LABEL */}
              <div
                className="
                  absolute
                  bottom-5
                  left-1/2
                  z-20
                  -translate-x-1/2
                  translate-y-3
                  rounded-full
                  border border-white/60
                  bg-white/50
                  px-4 py-2
                  text-xs font-medium
                  text-app-text-light
                  shadow-lg
                  backdrop-blur-md
                  opacity-0
                  transition-all duration-500
                  group-hover/image:translate-y-0
                  group-hover/image:opacity-100
                "
              >
                Premium Quality
              </div>
            </div>

            {/* RIGHT — PRODUCT INFORMATION */}
            <div
              className="
                relative
                flex flex-col justify-center
                border-t
                border-white/50
                bg-white/40
                p-6
                backdrop-blur-md
                md:border-l
                md:border-t-0
                md:p-10
                lg:p-12
              "
            >
              {/* Category */}
              <span
                className="
                  mb-3
                  w-fit
                  rounded-full
                  border border-app-green/10
                  bg-app-green/5
                  px-3 py-1
                  text-xs font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-app-green
                "
              >
                {categoryLabel}
              </span>
              {/* Product name */}
              <h1
                className="
                  font-serif
                  text-3xl
                  font-bold
                  leading-tight
                  text-app-text
                  transition-colors duration-300
                  md:text-4xl
                "
              >
                {product.name}
              </h1>

              {/* Rating  */}
              {product.rating > 0 && (
                <div
                  className="
                    mt-4
                    flex flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <div
                    className="
                      flex items-center gap-2
                      rounded-full
                      border border-yellow-200/60
                      bg-yellow-50/60
                      px-3 py-1.5
                      backdrop-blur-sm
                    "
                  >
                    <StarRating rating={product.rating} size={16} />

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-green-950
                      "
                    >
                      {product.rating}
                    </span>
                  </div>

                  <span
                    className="
                      text-sm
                      text-app-text-light
                    "
                  >
                    {product.reviewCount} reviews
                  </span>
                </div>
              )}

              {/* Divider */}

              <div
                className="
                  my-6
                  h-px
                  w-full
                  bg-linear-to-r
                  from-app-green/20
                  via-app-green/5
                  to-transparent
                "
              />

              {/* Price */}
              <div className="flex items-end gap-3">
                <span
                  className="
                    bg-linear-to-r
                    from-app-green
                    to-green-700
                    bg-clip-text
                    text-3xl
                    font-bold
                    text-transparent
                    md:text-4xl
                  "
                >
                  {currency}
                  {product.price.toFixed(2)}
                </span>

                {product.originalPrice > 0 && (
                  <span
                    className="
                      mb-1
                      text-base
                      font-medium
                      text-app-text-light
                      line-through
                    "
                  >
                    {currency}
                    {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className="
                  mt-5
                  max-w-xl
                  text-sm
                  leading-7
                  text-app-text-light
                "
              >
                {product.description}
              </p>

              {/* Stock */}
              <div className="mt-5">
                {product.stock > 0 ? (
                  <div
                    className="
                      inline-flex
                      items-center gap-2
                      rounded-full
                      border
                      border-green-200/70
                      bg-green-50/70
                      px-3 py-1.5
                      text-sm font-medium
                      text-app-success
                      backdrop-blur-sm
                    "
                  >
                    <span
                      className="
                        h-2 w-2
                        animate-pulse
                        rounded-full
                        bg-green-500
                      "
                    />
                    In stock · {product.stock} left
                  </div>
                ) : (
                  <div
                    className="
                      inline-flex
                      items-center gap-2
                      rounded-full
                      border
                      border-red-200/70
                      bg-red-50/70
                      px-3 py-1.5
                      text-sm font-medium
                      text-app-error
                    "
                  >
                    <span
                      className="
                        h-2 w-2
                        rounded-full
                        bg-red-500
                      "
                    />
                    Out of stock
                  </div>
                )}
              </div>

              {/* QUANTITY + ADD TO CART */}
              <div className="mt-7 flex gap-3">
                {/* Quantity */}
                {inCart && (
                  <div
                    className="
                      flex items-center
                      rounded-2xl
                      border border-app-border/70
                      bg-white/70
                      p-1
                      shadow-sm
                      backdrop-blur-md
                    "
                  >
                    <button
                      onClick={handleDecrement}
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-xl
                        text-app-text-light
                        transition-all duration-200
                        hover:bg-app-green/10
                        hover:text-app-green
                        active:scale-90
                      "
                    >
                      <MinusIcon className="size-4" />
                    </button>

                    <span
                      className="
                        flex min-w-12
                        items-center
                        justify-center
                        text-sm
                        font-bold
                        text-app-text
                      "
                    >
                      {displayQuantity}
                    </span>

                    <button
                      onClick={handleIncrement}
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-xl
                        text-app-text-light
                        transition-all duration-200
                        hover:bg-app-green/10
                        hover:text-app-green
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
                    group
                    relative
                    flex flex-1
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-2xl
                    py-3.5
                    font-semibold
                    shadow-lg
                    transition-all duration-300
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    ${
                      inCart
                        ? `
                          border
                          border-green-700/30
                          bg-green-500
                          text-green-950
                          shadow-green-900/10
                        `
                        : `
                           bg-linear-to-r
                          from-app-orange
                          to-orange-500
                          text-white
                          shadow-orange-900/15
                          hover:-translate-y-0.5
                          hover:shadow-xl
                        `
                    }
                  `}
                >
                  {/* Glossy sweep */}
                  {!inCart && (
                    <span
                      className="
                        absolute
                        inset-y-0
                        -left-full
                        w-1/3
                        skew-x-[-20deg]
                        bg-white/20
                        transition-all duration-700
                        group-hover:left-[120%]
                      "
                    />
                  )}

                  <ShoppingCartIcon
                    className="
                      relative
                      size-5
                      transition-transform duration-300
                      group-hover:scale-110
                      group-hover:-rotate-3
                    "
                  />

                  <span className="relative">
                    {inCart ? "Added to Cart" : "Add to Cart"}
                  </span>
                </button>
              </div>

              {/* TRUST INDICATORS */}
              <div
                className="
                  mt-6
                  grid grid-cols-3
                  divide-x
                  divide-app-border/60
                  rounded-2xl
                  border border-white/60
                  bg-white/40
                  py-3
                  backdrop-blur-md
                "
              >
                <div className="text-center">
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-app-text
                    "
                  >
                    Quality
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-app-text-light
                    "
                  >
                    Guaranteed
                  </p>
                </div>

                <div className="text-center">
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-app-text
                    "
                  >
                    Fresh
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-app-text-light
                    "
                  >
                    Carefully packed
                  </p>
                </div>

                <div className="text-center">
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-app-text
                    "
                  >
                    Secure
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-app-text-light
                    "
                  >
                    Easy checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS */}
        {product.reviewCount > 0 && (
          <div className="mt-12">
            <DummyReviewsSection product={product} />
          </div>
        )}

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mb-44 mt-16">
            {/* Section heading */}

            <div
              className="
                mb-6
                flex items-end
                justify-between
                gap-4
              "
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="
                      h-1.5 w-8
                      rounded-full
                      bg-app-orange
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-app-orange
                    "
                  >
                    You may also like
                  </span>
                </div>

                <h2
                  className="
                    font-serif
                    text-2xl
                    font-bold
                    text-app-green
                    md:text-3xl
                  "
                >
                  Related Products
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-app-text-light
                  "
                >
                  More from {categoryLabel}
                </p>
              </div>

              {/* View all */}

              <Link
                to={`/products?category=${product.category}`}
                onClick={() => scrollTo(0, 0)}
                className="
                  group
                  flex items-center gap-1.5
                  rounded-full
                  border border-app-orange/20
                  bg-white/50
                  px-4 py-2
                  text-sm
                  font-medium
                  text-app-orange
                  shadow-sm
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-app-orange
                  hover:text-white
                  hover:shadow-lg
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
                grid
                grid-cols-2
                gap-4
                sm:grid-cols-3
                lg:grid-cols-5
                xl:gap-8
              "
            >
              {relatedProducts.slice(0, 5).map((rp) => (
                <ProductCard key={rp._id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
