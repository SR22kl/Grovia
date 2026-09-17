import {
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  MapPinned,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import type { Address } from "../../types";

interface CheckoutReviewProps {
  address: Address;
  items: any[];
  handlePlaceOrder: () => void;
  loading: boolean;
  total: number;
}

export default function CheckoutReview({
  address,
  items,
  handlePlaceOrder,
  loading,
  total,
}: CheckoutReviewProps) {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-7">
      {/* HEADER */}

      <div className="mb-7 flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
          <ClipboardCheck className="size-5 text-emerald-300" />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Step 03
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Review Your Order
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Everything looks good? Place your order below.
          </p>
        </div>
      </div>

      {/* DELIVERY ADDRESS */}

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPinned className="size-4 text-emerald-400" />

            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Delivery Address
            </h3>
          </div>

          <CheckCircle2 className="size-4 text-emerald-400" />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-300 hover:border-emerald-400/20 hover:bg-white/5">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {address.label}
              </span>

              {address.isDefault && (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  Default
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-white/50">
              {address.address}
              <br />
              {address.city}, {address.state} {address.zip}
            </p>
          </div>
        </div>
      </section>

      {/* PAYMENT */}

      <section className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <WalletCards className="size-4 text-emerald-400" />

          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Payment
          </h3>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-400/10">
              <WalletCards className="size-4 text-emerald-300" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Payment at Checkout
              </p>

              <p className="text-xs text-white/35">
                Your selected payment method
              </p>
            </div>
          </div>

          <CheckCircle2 className="size-4 text-emerald-400" />
        </div>
      </section>

      {/* ITEMS */}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Order Items
          </h3>

          <span className="text-[11px] text-white/30">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/2.5">
          {items.map((item, index) => (
            <div
              key={item.product._id}
              className={`group flex items-center gap-3 p-3.5 transition-colors duration-300 hover:bg-white/4 sm:p-4 ${
                index !== items.length - 1 ? "border-b border-white/[0.07]" : ""
              }`}
            >
              {/* Product image */}
              <div className="relative shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-14 rounded-xl border border-white/10 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Quantity badge */}
                <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full border border-[#031c14] bg-emerald-400 px-1.5 py-0.5 text-[9px] font-bold text-[#031c14]">
                  {item.quantity}
                </span>
              </div>

              {/* Product info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {item.product.name}
                </p>

                <p className="mt-1 text-xs text-white/35">
                  {currency}
                  {item.product.price.toFixed(2)} × {item.quantity}
                </p>
              </div>

              {/* Item total */}
              <span className="shrink-0 text-sm font-semibold text-white">
                {currency}
                {(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="my-6 h-px bg-white/10" />

      <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/40">Total amount</p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-white">
              {currency}
              {total.toFixed(2)}
            </p>
          </div>

          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/10">
            <CheckCircle2 className="size-5 text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/5 bg-black/10 px-3.5 py-3">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />

        <p className="text-[11px] leading-relaxed text-white/35">
          By placing this order, you confirm that your delivery information is
          correct. Your checkout information is securely processed.
        </p>
      </div>

      {/* PLACE ORDER */}

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-500 px-6 py-4 text-sm font-bold text-[#031c14] shadow-xl shadow-emerald-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-500/20 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {/* Shine animation */}
        {!loading && (
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}

        {loading ? (
          <>
            <Loader2 className="relative size-4 animate-spin" />
            <span className="relative">Placing Order...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="relative size-5 transition-transform duration-300 group-hover:scale-110" />

            <span className="relative">
              Place Order — {currency}
              {total.toFixed(2)}
            </span>
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[10px] text-white/25">
        You can review your order details before confirming.
      </p>
    </div>
  );
}
