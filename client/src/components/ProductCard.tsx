import { useNavigate } from "react-router-dom";
import { Plus, ShoppingBag, Star } from "lucide-react";

import type { Product } from "../types";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/products/${product._id}`)}
      className="
        group
        relative isolate
        flex h-full
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/4.5
        shadow-lg shadow-black/10
        backdrop-blur-2xl
        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-emerald-400/20
        hover:bg-white/6
        hover:shadow-2xl
        hover:shadow-black/25
      "
    >
      {/* =========================================================
          GLASS SHINE
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute inset-y-0 left-[-120%]
          z-30
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

      {/* =========================================================
          IMAGE AREA
      ========================================================= */}

      <div
        className="
          relative
          aspect-square
          overflow-hidden
          border-b border-white/6
          bg-linear-to-br
          from-white/4.5
          via-transparent
          to-emerald-400/2.5
        "
      >
        {/* Image ambient glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2 top-1/2
            size-32
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-emerald-300/6
            blur-[55px]
            transition-all
            duration-500
            group-hover:size-40
            group-hover:bg-emerald-300/10
          "
        />

        {/* Image */}
        <img
          src={product?.image}
          alt={product?.name}
          className="
            relative z-10
            h-full w-full
            object-cover
            p-4
            transition-transform
            duration-500
            ease-out
            group-hover:scale-[1.07]
          "
        />

        {/* =======================================================
            DISCOUNT BADGE
        ======================================================= */}

        {product.discount > 0 && (
          <span
            className="
              absolute left-3 top-3
              z-20
              rounded-full
              border border-orange-300/20
              bg-orange-400/90
              px-2.5 py-1
              text-[9px]
              font-bold
              uppercase
              tracking-wide
              text-white
              shadow-lg
              shadow-orange-950/20
              backdrop-blur-md
            "
          >
            {product.discount}% Off
          </span>
        )}

        {/* =======================================================
            ADD TO CART
        ======================================================= */}

        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="
            group/cart
            absolute
            right-3 top-3
            z-20
            flex size-9
            items-center
            justify-center
            rounded-xl
            border border-white/15
            bg-[#031c14]/70
            text-white/60
            shadow-lg
            shadow-black/20
            backdrop-blur-xl
            transition-all
            duration-300

            hover:scale-105
            hover:border-emerald-400/30
            hover:bg-emerald-400
            hover:text-[#031c14]

            active:scale-95
          "
        >
          <Plus
            className="
              size-4
              transition-transform
              duration-300
              group-hover/cart:rotate-90
            "
          />
        </button>
      </div>

      {/* =========================================================
          PRODUCT CONTENT
      ========================================================= */}

      <div className="relative z-10 flex flex-1 flex-col p-3.5">
        {/* Product name */}
        <h3
          className="
            line-clamp-2
            min-h-10
            text-xs
            font-semibold
            leading-5
            text-white/75
            transition-colors
            duration-300
            group-hover:text-white
          "
        >
          {product?.name}
        </h3>

        {/* =======================================================
            RATING
        ======================================================= */}

        {product?.rating > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            <div
              className="
                flex items-center gap-1
                rounded-md
                bg-orange-300/8
                px-1.5 py-1
              "
            >
              <Star className="size-3 fill-orange-300 text-orange-300" />

              <span className="text-[10px] font-bold text-orange-200">
                {product?.rating.toFixed(1)}
              </span>
            </div>

            <span className="text-[10px] text-white/25">
              ({product?.reviewCount})
            </span>
          </div>
        )}

        {/* =======================================================
            PRICE
        ======================================================= */}

        <div className="mt-auto pt-3">
          <div className="flex min-w-0 items-end justify-between gap-2">
            <div className="min-w-0">
              <div className="flex min-w-0 items-baseline gap-1.5">
                <span className="truncate text-sm font-bold tracking-tight text-white sm:text-base">
                  {currency}
                  {product?.price.toFixed(2)}
                </span>

                <span className="shrink-0 text-[9px] text-white/25">
                  /{product?.unit}
                </span>
              </div>

              {product.originalPrice > product.price && (
                <span className="mt-0.5 block text-[10px] text-white/25 line-through">
                  {currency}
                  {product?.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Small cart indicator */}
            <div
              className="
                hidden
                size-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                border border-white/8
                bg-white/4
                text-white/20
                transition-all
                duration-300
                group-hover:border-emerald-400/15
                group-hover:bg-emerald-400/8
                group-hover:text-emerald-300
                sm:flex
              "
            >
              <ShoppingBag className="size-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM EDGE HIGHLIGHT
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-px
          bg-linear-to-r
          from-transparent
          via-white/8
          to-transparent
        "
      />

      {/* Inner glass border */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-3xl
          ring-1 ring-inset
          ring-white/4
        "
      />
    </article>
  );
};

export default ProductCard;
