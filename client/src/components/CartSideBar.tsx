import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowRightIcon,
  Minus,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";

const CartSideBar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const {
    items,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 20;
  const deliveryFee = cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : 20;
  const amountForFreeDelivery =
    FREE_DELIVERY_THRESHOLD - cartTotal > 0
      ? FREE_DELIVERY_THRESHOLD - cartTotal
      : 0;

  const grandTotal = cartTotal + deliveryFee;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] animate-fade-in"
      />

      {/* Sidebar */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-linear-to-r from-app-green via-emerald-800 to-app-green shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <ShoppingBagIcon className="size-5 text-zinc-100" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-zinc-100">
                Your Cart
              </h2>

              <p className="text-xs text-zinc-300/80">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="flex size-9 items-center justify-center rounded-xl bg-white/5 text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                <ShoppingBagIcon className="size-9 text-zinc-300/80" />
              </div>

              <h3 className="mb-1 text-lg font-semibold text-zinc-100">
                Your cart is empty
              </h3>

              <p className="max-w-60 text-sm leading-relaxed text-zinc-300/80">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const itemTotal = item.product.price * item.quantity;

                return (
                  <div
                    key={item.product._id}
                    className="group flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/[0.13]"
                  >
                    {/* Product Image */}
                    <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-semibold text-zinc-100">
                            {item.product.name}
                          </h4>

                          <p className="mt-0.5 text-xs text-zinc-300/80">
                            {currency}
                            {item.product.price.toFixed(2)} /{" "}
                            {item.product.unit}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center rounded-lg border border-white/10 bg-black/10 p-0.5">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1,
                              )
                            }
                            aria-label="Decrease quantity"
                            className="flex size-7 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-white/10 hover:text-white active:scale-90"
                          >
                            <Minus className="size-3.5" />
                          </button>

                          <span className="flex min-w-7 justify-center text-sm font-semibold text-zinc-100">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity + 1,
                              )
                            }
                            aria-label="Increase quantity"
                            className="flex size-7 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-white/10 hover:text-white active:scale-90"
                          >
                            <PlusIcon className="size-3.5" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <span className="text-sm font-bold text-app-cream">
                          {currency}
                          {itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 bg-black/10 px-5 pb-5 pt-4 backdrop-blur-sm">
            {/* Free Delivery Message */}
            {deliveryFee > 0 ? (
              <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <p className="text-center text-xs text-zinc-300">
                  Add{" "}
                  <span className="font-semibold text-app-cream">
                    {currency}
                    {amountForFreeDelivery.toFixed(2)}
                  </span>{" "}
                  more for{" "}
                  <span className="font-semibold text-zinc-100">
                    FREE delivery
                  </span>
                </p>
              </div>
            ) : (
              <div className="mb-4 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2.5">
                <p className="text-center text-xs font-medium text-emerald-100">
                  🎉 You've unlocked free delivery!
                </p>
              </div>
            )}

            {/* Price Summary */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300">Subtotal</span>
                <span className="font-medium text-zinc-100">
                  {currency}
                  {cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-zinc-300">Delivery Fee</span>

                {deliveryFee === 0 ? (
                  <span className="font-semibold text-emerald-300">Free</span>
                ) : (
                  <span className="font-medium text-zinc-100">
                    {currency}
                    {deliveryFee.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="my-3 border-t border-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-zinc-100">
                  Total
                </span>

                <span className="text-xl font-bold text-app-cream">
                  {currency}
                  {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
                window.scrollTo(0, 0);
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-app-orange py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/20 transition-all duration-200 hover:bg-app-orange-dark hover:shadow-orange-950/30 active:scale-[0.98]"
            >
              Proceed to Checkout
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartSideBar;
