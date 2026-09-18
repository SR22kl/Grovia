import {
  CheckCircle2,
  CircleCheck,
  KeyRound,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";

interface OtpModalProps {
  setOtpModal: (otpModal: string | null) => void;
  otp: string;
  setOtp: (otp: string) => void;
  handleComplete: () => void;
  submitting: boolean;
}

export default function OtpModal({
  setOtpModal,
  otp,
  setOtp,
  handleComplete,
  submitting,
}: OtpModalProps) {
  const handleClose = () => {
    if (submitting) return;

    setOtpModal(null);
    setOtp("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 animate-[modalFade_.2s_ease-out] bg-black/65 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="otp-delivery-title"
          className="relative w-full max-w-md animate-[modalEnter_.3s_cubic-bezier(.16,1,.3,1)] overflow-hidden rounded-3xl border border-white/10 bg-[#071f17]/90 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-28 -top-28 size-64 rounded-full bg-emerald-400/[0.10] blur-[90px]" />

          {/* Top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          {/* Header */}
          <div className="relative flex items-start justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="relative flex size-11 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10">
                <KeyRound className="size-5 text-emerald-400" />

                <span className="absolute -right-1 -top-1 flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex size-3 rounded-full border-2 border-[#071f17] bg-emerald-400" />
                </span>
              </div>

              <div>
                <h3
                  id="otp-delivery-title"
                  className="text-base font-bold tracking-tight text-white"
                >
                  Confirm Delivery
                </h3>

                <p className="mt-0.5 text-[10px] text-white/30">
                  Verify the customer's delivery
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              aria-label="Close"
              className="flex size-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/35 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08] hover:text-white/70 disabled:pointer-events-none disabled:opacity-30"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Info */}
          <div className="relative px-6 pt-5">
            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.045] px-4 py-3.5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400/80" />

                <div>
                  <p className="text-xs font-semibold text-emerald-300">
                    Secure delivery verification
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-white/35">
                    Ask the customer for the 6-digit OTP shown on their tracking
                    page.
                  </p>
                </div>
              </div>
            </div>

            {/* OTP Input */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <label
                  htmlFor="delivery-otp"
                  className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35"
                >
                  Delivery OTP
                </label>

                <span className="text-[9px] font-medium text-white/20">
                  {otp.length}/6
                </span>
              </div>

              <div className="relative">
                <input
                  id="delivery-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  disabled={submitting}
                  placeholder="000000"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-5 text-center font-mono text-3xl font-bold tracking-[0.5em] text-emerald-300 outline-none transition-all duration-300 placeholder:text-white/10 focus:border-emerald-400/30 focus:bg-black/25 focus:ring-4 focus:ring-emerald-400/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
                />

                {otp.length === 6 && !submitting && (
                  <div className="absolute right-4 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-400/10">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                  </div>
                )}
              </div>

              {/* OTP progress */}
              <div className="mt-3 flex gap-1.5">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      index < otp.length ? "bg-emerald-400" : "bg-white/[0.08]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative flex gap-2.5 px-6 pb-6 pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-xs font-semibold text-white/50 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08] hover:text-white/80 disabled:pointer-events-none disabled:opacity-30"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleComplete}
              disabled={otp.length !== 6 || submitting}
              className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400 px-4 py-3 text-xs font-bold text-[#031c14] shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:bg-emerald-300 hover:shadow-emerald-900/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CircleCheck className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                  Confirm Delivery
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
