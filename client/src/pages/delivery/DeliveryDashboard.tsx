import { useEffect, useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Navigation,
  Package,
  Radio,
  Truck,
} from "lucide-react";

import OtpModal from "../../components/Delivery/OtpModal";
import CancelModal from "../../components/Delivery/CancelModal";
import DeliveryOrderCard from "../../components/Delivery/DeliveryOrderCard";
import Loading from "../../components/Loading";

import type { Order } from "../../types";
import { dummyDashboardOrdersData } from "../../assets/assets";

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"active" | "completed">("active");
  const [tracking, setTracking] = useState(false);

  // OTP modal
  const [otpModal, setOtpModal] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Cancel modal
  const [cancelModal, setCancelModal] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setOrders(dummyDashboardOrdersData as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [tab]);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    console.log(orderId, status);
  };

  const handleComplete = async () => {
    if (!otpModal || !otp) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setOtpModal(null);
      setOtp("");
    }, 1000);
  };

  const handleCancel = async () => {
    if (!cancelModal) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setCancelModal(null);
      setCancelReason("");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* -------------------------------------------------
          PAGE HEADER
      -------------------------------------------------- */}
      <section className="animate-[fadeUp_.45s_ease-out]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-400/10">
                <Truck className="size-3.5 text-emerald-400" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Delivery Dashboard
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Your Deliveries
            </h2>

            <p className="mt-1 text-sm text-white/35">
              Manage your assigned deliveries and update their status.
            </p>
          </div>

          {/* Location status */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
            <span className="relative flex size-2">
              {tracking && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}

              <span
                className={`relative inline-flex size-2 rounded-full ${
                  tracking ? "bg-emerald-400" : "bg-white/20"
                }`}
              />
            </span>

            <span className="text-[10px] font-semibold text-white/45">
              {tracking ? "Location sharing active" : "Location sharing off"}
            </span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          FILTERS / LOCATION
      -------------------------------------------------- */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Tabs */}
        <div className="flex w-fit rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
          {(["active", "completed"] as const).map((t) => {
            const isActive = tab === t;

            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-400 text-[#031c14] shadow-lg shadow-emerald-950/30"
                    : "text-white/40 hover:bg-white/4 hover:text-white/70"
                }`}
              >
                {t === "active" ? (
                  <Package className="size-3.5" />
                ) : (
                  <CheckCircle2 className="size-3.5" />
                )}

                <span>{t === "active" ? "Active" : "Completed"}</span>

                {t === "active" && orders.length > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] ${
                      isActive ? "bg-[#031c14]/15" : "bg-white/10"
                    }`}
                  >
                    {orders.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tracking */}
        <button
          onClick={() => setTracking((prev) => !prev)}
          className={`group flex items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:ml-auto ${
            tracking
              ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-300 shadow-lg shadow-emerald-950/20"
              : "border-white/10 bg-white/5 text-white/45 hover:border-emerald-400/20 hover:bg-emerald-400/6 hover:text-emerald-300"
          }`}
        >
          <Navigation
            className={`size-3.5 transition-transform duration-300 ${
              tracking ? "animate-pulse" : "group-hover:-translate-y-0.5"
            }`}
          />

          <span>{tracking ? "Sharing Location" : "Share Location"}</span>

          {tracking && (
            <span className="relative ml-1 flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
          )}
        </button>
      </section>

      {/* -------------------------------------------------
          LOCATION SHARING PANEL
      -------------------------------------------------- */}
      {tracking && (
        <div className="animate-[fadeDown_.3s_ease-out] overflow-hidden rounded-2xl border border-emerald-400/15 bg-emerald-400/6 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/10">
              <Radio className="size-4 animate-pulse text-emerald-400" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-emerald-300">
                Live location sharing enabled
              </p>

              <p className="mt-0.5 text-[11px] text-white/30">
                Your current location can be shared while you're delivering an
                active order.
              </p>
            </div>

            <MapPin className="hidden size-5 text-emerald-400/50 sm:block" />
          </div>
        </div>
      )}

      {/* -------------------------------------------------
          ORDERS
      -------------------------------------------------- */}
      {loading ? (
        <div className="flex min-h-80 items-center justify-center rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl">
          <Loading />
        </div>
      ) : orders.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 px-6 py-20 text-center shadow-2xl shadow-black/10 backdrop-blur-2xl">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[80px]" />

          <div className="relative">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-xl">
              {tab === "active" ? (
                <Package className="size-7 text-white/25" />
              ) : (
                <CheckCircle2 className="size-7 text-emerald-400/50" />
              )}
            </div>

            <h3 className="text-lg font-bold text-white">
              No {tab} deliveries
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/30">
              {tab === "active"
                ? "You'll see new delivery assignments here when they're available."
                : "Your completed deliveries will appear here."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="animate-[fadeUp_.4s_ease-out]"
              style={{
                animationDelay: `${index * 70}ms`,
                animationFillMode: "both",
              }}
            >
              <DeliveryOrderCard
                order={order}
                tab={tab}
                handleUpdateStatus={handleUpdateStatus}
                setOtpModal={setOtpModal}
                setCancelModal={setCancelModal}
              />
            </div>
          ))}
        </div>
      )}

      {/* -------------------------------------------------
          MODALS
      -------------------------------------------------- */}
      {otpModal && (
        <OtpModal
          setOtpModal={setOtpModal}
          otp={otp}
          setOtp={setOtp}
          handleComplete={handleComplete}
          submitting={submitting}
        />
      )}

      {cancelModal && (
        <CancelModal
          setCancelModal={setCancelModal}
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          handleCancel={handleCancel}
          submitting={submitting}
        />
      )}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
