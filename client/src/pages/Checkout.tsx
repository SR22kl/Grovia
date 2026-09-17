import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { dummyAddressData } from "../assets/assets";
import type { Address } from "../types";
import {
  ArrowLeft,
  Check,
  ClipboardCheck,
  CreditCard,
  MapPinned,
  Package,
  ShieldCheck,
} from "lucide-react";

import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutReview from "../components/Checkout/CheckoutReview";

const Checkout = () => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const { items, cartTotal } = useCart();

  const { user } = {
    user: { addresses: dummyAddressData },
  };

  const [step, setStep] = useState("address");
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState<Address>({
    _id: "",
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
    lat: 0,
    lng: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + deliveryFee + tax;

  const steps = [
    {
      key: "address",
      label: "Address",
      description: "Delivery details",
      icon: MapPinned,
    },
    {
      key: "payment",
      label: "Payment",
      description: "Choose payment",
      icon: CreditCard,
    },
    {
      key: "review",
      label: "Review",
      description: "Confirm order",
      icon: ClipboardCheck,
    },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const handlePlaceOrder = async () => {
    setLoading(true);
    navigate("/orders");
  };

  useEffect(() => {
    if (user?.addresses) {
      const defaultAddress =
        user.addresses.find((addr) => addr.isDefault) || user.addresses[0];

      if (defaultAddress) {
        setAddress({
          _id: defaultAddress._id,
          label: defaultAddress.label,
          address: defaultAddress.address,
          city: defaultAddress.city,
          state: defaultAddress.state,
          zip: defaultAddress.zip,
          isDefault: defaultAddress.isDefault,
          lat: defaultAddress.lat,
          lng: defaultAddress.lng,
        });
      }
    }
  }, []);

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#031c14] flex items-center justify-center px-4">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-green-400/15 blur-3xl" />

        <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl animate-[fadeUp_.5s_ease-out]">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
            <Package className="size-8 text-emerald-300" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white">
            <span className="text-emerald-400">Oops!</span> Your cart is empty
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Add some products to your cart before continuing to checkout.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-500/20"
          >
            Browse Products
            <ArrowLeft className="size-4 rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#031c14]">
      {/* BG */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-125 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="absolute -right-45 top-[20%] size-125 rounded-full bg-green-400/10 blur-[120px]" />
        <div className="absolute -bottom-62.5 left-[30%] size-125 rounded-full bg-teal-400/10 blur-[130px]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/6 text-white/60 backdrop-blur-xl transition-all duration-300 hover:-translate-x-0.5 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-xl">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span className="text-xs font-medium text-white/60">
              Secure Checkout
            </span>
          </div>
        </div>

        {/* TITLE */}

        <div className="mb-8 animate-[fadeUp_.5s_ease-out]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Almost there
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Complete your <span className="text-emerald-400">order</span>
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Review your details and place your order securely.
          </p>
        </div>

        {/* STEPS */}

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-2xl sm:p-4">
          <div className="flex items-center justify-between">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.key === step;
              const isCompleted = index < currentStepIndex;

              return (
                <div
                  key={item.key}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <button
                    onClick={() => {
                      if (index <= currentStepIndex) {
                        setStep(item.key);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    disabled={index > currentStepIndex}
                    className={`group flex items-center gap-3 text-left transition-all duration-300 ${
                      index > currentStepIndex
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={`relative flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ${
                        isActive
                          ? "border-emerald-400/50 bg-emerald-400 text-[#031c14] shadow-lg shadow-emerald-500/20"
                          : isCompleted
                            ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-300"
                            : "border-white/10 bg-white/4 text-white/40"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="size-5" />
                      ) : (
                        <Icon
                          className={`size-5 transition-transform duration-300 ${
                            isActive ? "scale-110" : "group-hover:scale-110"
                          }`}
                        />
                      )}
                    </div>

                    <div className="hidden sm:block">
                      <p
                        className={`text-sm font-semibold transition-colors ${
                          isActive
                            ? "text-white"
                            : isCompleted
                              ? "text-emerald-300"
                              : "text-white/45"
                        }`}
                      >
                        {item.label}
                      </p>

                      <p className="text-[11px] text-white/30">
                        {item.description}
                      </p>
                    </div>
                  </button>

                  {index < steps.length - 1 && (
                    <div className="mx-3 h-px flex-1 bg-white/10 sm:mx-5">
                      <div
                        className={`h-full origin-left bg-emerald-400 transition-transform duration-700 ${
                          index < currentStepIndex ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Main */}
          <div key={step} className="min-w-0 animate-[fadeUp_.45s_ease-out]">
            {step === "address" && (
              <CheckoutAddress
                user={user}
                address={address}
                setAddress={setAddress}
                setStep={setStep}
              />
            )}

            {step === "payment" && (
              <CheckoutPayment
                setStep={setStep}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}

            {step === "review" && (
              <CheckoutReview
                address={address}
                items={items}
                handlePlaceOrder={handlePlaceOrder}
                loading={loading}
                total={total}
              />
            )}
          </div>

          {/* Order Summary */}

          <aside className="h-fit lg:sticky lg:top-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-6">
              {/* Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-emerald-400/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      Your order
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-white">
                      Order Summary
                    </h3>
                  </div>

                  <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10">
                    <Package className="size-5 text-emerald-300" />
                  </div>
                </div>

                <div className="mb-5 flex items-center justify-between rounded-xl border border-white/5 bg-black/10 px-4 py-3">
                  <span className="text-xs text-white/40">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>

                  <span className="text-sm font-semibold text-white">
                    {currency}
                    {cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/45">Subtotal</span>
                    <span className="font-medium text-white/80">
                      {currency}
                      {cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/45">Delivery</span>

                    {deliveryFee === 0 ? (
                      <span className="font-semibold text-emerald-400">
                        Free
                      </span>
                    ) : (
                      <span className="font-medium text-white/80">
                        {currency}
                        {deliveryFee.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/45">Tax</span>
                    <span className="font-medium text-white/80">
                      {currency}
                      {tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="my-5 h-px bg-white/10" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/40">Total</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                      {currency}
                      {total.toFixed(2)}
                    </p>
                  </div>

                  <span className="mb-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    Secure
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/5 bg-white/3 px-3 py-2.5">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-400" />

                  <p className="text-[11px] leading-relaxed text-white/35">
                    Your checkout information is protected and securely
                    processed.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
