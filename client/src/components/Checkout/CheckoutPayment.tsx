import {
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  WalletCards,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface CheckoutPaymentProps {
  setStep: Dispatch<SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
}

export default function CheckoutPayment({
  setStep,
  paymentMethod,
  setPaymentMethod,
}: CheckoutPaymentProps) {
  const methods = [
    {
      value: "card",
      label: "Credit / Debit Card",
      desc: "Pay securely using your card",
      icon: CreditCard,
    },
    {
      value: "cash",
      label: "Cash on Delivery",
      desc: "Pay when your order arrives",
      icon: Banknote,
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-7">
      {/* Header */}
      <div className="mb-7 flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
          <WalletCards className="size-5 text-emerald-300" />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Step 02
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">Payment Method</h2>

          <p className="mt-1 text-sm text-white/40">
            Choose how you'd like to pay.
          </p>
        </div>
      </div>

      {/* Payment methods */}
      <div className="space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const selected = paymentMethod === method.value;

          return (
            <button
              type="button"
              key={method.value}
              onClick={() => setPaymentMethod(method.value)}
              className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                selected
                  ? "border-emerald-400/50 bg-emerald-400/10 shadow-lg shadow-emerald-950/20"
                  : "border-white/10 bg-white/[0.035] hover:-translate-y-0.5 hover:border-emerald-400/25 hover:bg-white/6"
              }`}
            >
              {selected && (
                <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-emerald-400/10 blur-2xl" />
              )}

              <div
                className={`relative flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  selected
                    ? "bg-emerald-400 text-[#031c14]"
                    : "bg-white/6 text-white/45 group-hover:text-emerald-300"
                }`}
              >
                <Icon className="size-5" />
              </div>

              <div className="relative flex-1">
                <p className="text-sm font-semibold text-white">
                  {method.label}
                </p>

                <p className="mt-1 text-xs text-white/35">{method.desc}</p>
              </div>

              <div
                className={`relative flex size-5 items-center justify-center rounded-full border transition-all duration-300 ${
                  selected
                    ? "border-emerald-400 bg-emerald-400 text-[#031c14]"
                    : "border-white/20"
                }`}
              >
                {selected && <Check className="size-3.5" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Security message */}
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-400/10">
          <CreditCard className="size-4 text-emerald-400" />
        </div>

        <p className="text-xs leading-relaxed text-white/35">
          Your payment details are handled securely and are never stored
          unnecessarily.
        </p>
      </div>

      {/* Continue */}
      <button
        onClick={() => {
          setStep("review");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-[#031c14] shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-500/20"
      >
        Review Order
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}
