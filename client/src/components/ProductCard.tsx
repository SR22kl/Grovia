import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { Plus, Star } from "lucide-react";

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";
  const { addToCart } = { addToCart: (_data: any) => {} };
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 group animate-fade-in cursor-pointer"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover p-4 group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
          {/* Badges*/}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.discount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-app-orange text-white rounded-full">
                {product?.discount}% Off
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="text-zinc-700 p-3.5">
          <h3 className="text-sm leading-snug mb-1.5 line-clamp-2">
            {product?.name}
          </h3>

          {/* Ratings */}
          {product?.rating > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              <Star className="text-app-warning fill-app-warning size-3" />
              <span className="text-xs font-medium text-app-text">
                {product?.rating.toFixed(1)}
              </span>
              <span className="text-xs text-app-text-light">
                ({product?.reviewCount})
              </span>
            </div>
          )}
          {/* Price + Add to cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 truncate">
              <span className="text-base font-medium">
                {currency}
                {product?.price.toFixed(2)}
              </span>
              <span className="text-xs text-app-text-light block">
                /{product?.unit}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-app-text line-through ml-1.5">
                  {currency}
                  {product?.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="absolute top-2 right-3 size-7 rounded-full bg-app-orange text-white flex-center shrink-0 hover:bg-app-orange-dark transition-all active:scale-95"
            >
              <Plus className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
