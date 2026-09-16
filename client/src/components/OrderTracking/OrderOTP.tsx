import { KeyRoundIcon, ShieldCheckIcon } from "lucide-react";

export default function OrderOTP({ order }: { order: any }) {
  const showOtp =
    order.deliveryOtp &&
    ["Assigned", "Packed", "Out for Delivery"].includes(order.status);

  if (!showOtp) return null;

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-emerald-300/20
        bg-linear-to-br
        from-emerald-400/20
        via-emerald-500/10
        to-white/5
        p-5 sm:p-6
        shadow-xl shadow-black/10
        backdrop-blur-xl
        animate-[fadeIn_0.5s_ease-out_both]
      "
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-emerald-300/20 blur-3xl" />

      {/* Shine */}
      <div
        className="
          pointer-events-none absolute inset-0
          -translate-x-full
          skew-x-[-15deg]
          bg-linear-to-r from-transparent via-white/10 to-transparent
          transition-transform duration-700
          group-hover:translate-x-full
        "
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex size-11 items-center justify-center
              rounded-2xl
              border border-white/15
              bg-white/10
              shadow-lg
            "
          >
            <KeyRoundIcon className="size-5 text-emerald-200" />
          </div>

          <div>
            <h3 className="font-bold text-white">Delivery OTP</h3>

            <p className="mt-0.5 text-xs text-emerald-100/55">
              Share this code with your delivery partner
            </p>
          </div>
        </div>

        {/* OTP */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {order.deliveryOtp.split("").map((digit: string, i: number) => (
            <div
              key={i}
              className="
                flex size-12 items-center justify-center
                rounded-xl
                border border-white/15
                bg-white/10
                text-xl font-bold
                text-white
                shadow-lg shadow-black/10
                backdrop-blur-md
                transition-all duration-300
                hover:-translate-y-1
                hover:border-emerald-300/30
                hover:bg-emerald-400/15
                hover:shadow-emerald-400/10
              "
              style={{
                animationDelay: `${i * 70}ms`,
              }}
            >
              {digit}
            </div>
          ))}
        </div>

        {/* Security note */}
        <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-100/45">
          <ShieldCheckIcon className="size-3.5 text-emerald-300/60" />
          Keep this OTP private until your order arrives.
        </div>
      </div>
    </div>
  );
}
