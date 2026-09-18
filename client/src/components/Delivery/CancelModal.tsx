import { AlertTriangle, Loader2, X, XCircle } from "lucide-react";

interface CancelModalProps {
  setCancelModal: (cancelModal: string | null) => void;
  cancelReason: string;
  setCancelReason: (cancelReason: string) => void;
  handleCancel: () => void;
  submitting: boolean;
}

export default function CancelModal({
  setCancelModal,
  cancelReason,
  setCancelReason,
  handleCancel,
  submitting,
}: CancelModalProps) {
  const handleClose = () => {
    if (submitting) return;

    setCancelModal(null);
    setCancelReason("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 animate-[modalFade_.2s_ease-out] bg-black/65 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-delivery-title"
          className="relative w-full max-w-md animate-[modalEnter_.3s_cubic-bezier(.16,1,.3,1)] overflow-hidden rounded-3xl border border-white/10 bg-[#071f17]/90 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient red glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-red-500/[0.08] blur-[80px]" />

          {/* Top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent" />

          {/* -------------------------------------------------
              HEADER
          -------------------------------------------------- */}
          <div className="relative flex items-start justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-red-400/15 bg-red-400/10">
                <AlertTriangle className="size-5 text-red-400" />
              </div>

              <div>
                <h3
                  id="cancel-delivery-title"
                  className="text-base font-bold tracking-tight text-white"
                >
                  Cancel Delivery
                </h3>

                <p className="mt-0.5 text-[10px] text-white/30">
                  This action cannot be undone
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

          {/* -------------------------------------------------
              BODY
          -------------------------------------------------- */}
          <div className="relative px-6 pt-5">
            <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.045] px-4 py-3.5">
              <div className="flex gap-3">
                <XCircle className="mt-0.5 size-4 shrink-0 text-red-400/70" />

                <p className="text-xs leading-5 text-white/45">
                  Please provide a reason for cancelling this delivery. This
                  information may be used for delivery records.
                </p>
              </div>
            </div>

            {/* Reason */}
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="cancel-reason"
                  className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35"
                >
                  Cancellation Reason
                </label>

                <span className="text-[9px] text-white/20">
                  {cancelReason.length}/300
                </span>
              </div>

              <textarea
                id="cancel-reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value.slice(0, 300))}
                rows={4}
                disabled={submitting}
                placeholder="Tell us why this delivery needs to be cancelled..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-xs leading-5 text-white/75 outline-none placeholder:text-white/20 transition-all duration-300 focus:border-red-400/30 focus:bg-black/25 focus:ring-4 focus:ring-red-400/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* -------------------------------------------------
              ACTIONS
          -------------------------------------------------- */}
          <div className="relative flex gap-2.5 px-6 pb-6 pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-xs font-semibold text-white/50 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08] hover:text-white/80 disabled:pointer-events-none disabled:opacity-30"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting || !cancelReason.trim()}
              className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-xs font-bold text-red-300 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/15 hover:text-red-200 hover:shadow-lg hover:shadow-red-950/20 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <XCircle className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                  Confirm Cancel
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
