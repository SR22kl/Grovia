import {
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  Truck,
  XCircle,
} from "lucide-react";

import type { Order } from "../../types";
// import { statusColors } from "../../assets/assets";

interface DeliveryOrderCardProps {
  order: Order;
  tab: "active" | "completed";
  handleUpdateStatus: (orderId: string, status: string) => void;
  setOtpModal: (orderId: string) => void;
  setCancelModal: (orderId: string) => void;
}

export default function DeliveryOrderCard({
  order,
  tab,
  handleUpdateStatus,
  setOtpModal,
  setCancelModal,
}: DeliveryOrderCardProps) {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const user =
    typeof order.user === "object"
      ? order.user
      : {
          name: "Customer",
          email: "",
          phone: "",
        };

  const initials = user.name?.charAt(0)?.toUpperCase() || "C";

  const isCompleted = tab === "completed";

  const statusStyles: Record<
    string,
    {
      dot: string;
      bg: string;
      text: string;
      border: string;
    }
  > = {
    Assigned: {
      dot: "bg-blue-400",
      bg: "bg-blue-400/10",
      text: "text-blue-300",
      border: "border-blue-400/15",
    },
    Packed: {
      dot: "bg-violet-400",
      bg: "bg-violet-400/10",
      text: "text-violet-300",
      border: "border-violet-400/15",
    },
    "Out for Delivery": {
      dot: "bg-amber-400",
      bg: "bg-amber-400/10",
      text: "text-amber-300",
      border: "border-amber-400/15",
    },
    Delivered: {
      dot: "bg-emerald-400",
      bg: "bg-emerald-400/10",
      text: "text-emerald-300",
      border: "border-emerald-400/15",
    },
    Cancelled: {
      dot: "bg-red-400",
      bg: "bg-red-400/10",
      text: "text-red-300",
      border: "border-red-400/15",
    },
  };

  const currentStatus = statusStyles[order.status] || {
    dot: "bg-white/30",
    bg: "bg-white/5",
    text: "text-white/50",
    border: "border-white/10",
  };

  return (
    <article
      className={`group relative isolate overflow-hidden rounded-3xl border backdrop-blur-2xl transition-all duration-300 ease-in-out ${
        isCompleted
          ? "border-white/[0.07] bg-white/[0.035]"
          : "border-white/10 bg-white/5 hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-white/6.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
      }`}
    >
      {/* Glass Shine */}

      {!isCompleted && (
        <div
          className="
            pointer-events-none absolute inset-y-0 left-[-120%]
            z-20
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
      )}

      {/* -------------------------------------------------
          HEADER
      -------------------------------------------------- */}
      <div className="relative flex flex-col gap-4 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Order icon */}
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
              currentStatus.border
            } ${currentStatus.bg}`}
          >
            <Package className={`size-4 ${currentStatus.text}`} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-wide text-white/60">
                #{order._id.slice(-6).toUpperCase()}
              </span>

              <span
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${currentStatus.border} ${currentStatus.bg} ${currentStatus.text}`}
              >
                <span
                  className={`size-1.5 rounded-full ${currentStatus.dot} ${
                    order.status === "Out for Delivery" ? "animate-pulse" : ""
                  }`}
                />

                {order.status}
              </span>
            </div>

            <p className="mt-1 text-[10px] text-white/25">Delivery order</p>
          </div>
        </div>

        {/* Total */}
        <div className="sm:text-right">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/25">
            Order Total
          </p>

          <p className="mt-0.5 text-lg font-bold tracking-tight text-white">
            {currency}
            {order.total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* -------------------------------------------------
          BODY
      -------------------------------------------------- */}
      <div className="relative space-y-5 px-5 py-5">
        {/* Customer */}
        <div className="flex items-center gap-3">
          <div className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10">
            <span className="text-sm font-bold text-emerald-300">
              {initials}
            </span>

            <span className="absolute -bottom-0.5 -right-0.5 flex size-3 items-center justify-center rounded-full border-2 border-[#08241b] bg-emerald-400" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white/85">
              {user.name}
            </p>

            {user.phone ? (
              <a
                href={`tel:${user.phone}`}
                className="mt-0.5 flex w-fit items-center gap-1.5 text-[11px] text-white/35 transition-colors hover:text-emerald-300"
              >
                <Phone className="size-3" />
                {user.phone}
              </a>
            ) : (
              <p className="mt-0.5 text-[11px] text-white/25">
                No phone number
              </p>
            )}
          </div>

          {user.phone && (
            <a
              href={`tel:${user.phone}`}
              aria-label={`Call ${user.name}`}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-white/35 transition-all duration-300 hover:border-emerald-400/20 hover:bg-emerald-400/10 hover:text-emerald-300"
            >
              <Phone className="size-3.5" />
            </a>
          )}
        </div>

        {/* Address */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black/10">
          <div className="flex items-start gap-3 p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/8">
              <MapPin className="size-4 text-emerald-400" />
            </div>

            <div className="min-w-0">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
                Delivery Address
              </p>

              <p className="text-xs leading-5 text-white/60">
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2">
            <Package className="size-3 text-white/30" />

            <span className="text-[10px] font-medium text-white/45">
              {order.items.length} item
              {order.items.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2">
            <span className="text-[10px] font-medium uppercase tracking-wide text-white/40">
              {order.paymentMethod}
            </span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------
          ACTIONS
      -------------------------------------------------- */}
      {tab === "active" && (
        <div className="relative flex flex-wrap gap-2 border-t border-white/[0.07] bg-black/8 px-5 py-4">
          {/* Assigned → Packed */}
          {(order.status === "Assigned" || order.status === "Packed") && (
            <button
              onClick={() =>
                handleUpdateStatus(
                  order._id,
                  order.status === "Assigned" ? "Packed" : "Out for Delivery",
                )
              }
              className="group/action flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/15 hover:shadow-lg hover:shadow-emerald-950/20 active:scale-[0.98]"
            >
              <Truck className="size-3.5 transition-transform duration-300 group-hover/action:translate-x-0.5" />

              <span>
                {order.status === "Assigned"
                  ? "Mark Packed"
                  : "Out for Delivery"}
              </span>
            </button>
          )}

          {/* Out for delivery → Delivered */}
          {order.status === "Out for Delivery" && (
            <button
              onClick={() => setOtpModal(order._id)}
              className="group/action flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400 px-4 py-2.5 text-xs font-bold text-[#031c14] shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:bg-emerald-300 hover:shadow-emerald-900/30 active:scale-[0.98]"
            >
              <CheckCircle2 className="size-3.5 transition-transform duration-300 group-hover/action:scale-110" />

              <span>Mark Delivered</span>
            </button>
          )}

          {/* Cancel */}
          {order.status !== "Delivered" && order.status !== "Cancelled" && (
            <button
              onClick={() => setCancelModal(order._id)}
              className="group/action flex items-center gap-2 rounded-xl border border-red-400/10 bg-red-400/6 px-4 py-2.5 text-xs font-semibold text-red-300/70 transition-all duration-300 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300 active:scale-[0.98]"
            >
              <XCircle className="size-3.5 transition-transform duration-300 group-hover/action:scale-105" />

              <span>Cancel</span>
            </button>
          )}
        </div>
      )}

      {/* -------------------------------------------------
          COMPLETED FOOTER
      -------------------------------------------------- */}
      {tab === "completed" && (
        <div className="flex items-center justify-between border-t border-white/[0.07] bg-black/8 px-5 py-3.5">
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            <Clock3 className="size-3" />

            <span>
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400/60">
            <CheckCircle2 className="size-3" />
            Delivered
          </div>
        </div>
      )}
    </article>
  );
}
