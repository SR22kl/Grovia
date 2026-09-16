import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Order } from "../types";
import { dummyDashboardOrdersData } from "../assets/assets";
import Loading from "../components/Loading";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  ReceiptTextIcon,
  SparklesIcon,
} from "lucide-react";
import OrderOTP from "../components/OrderTracking/OrderOTP";
import LiveMap from "../components/OrderTracking/LiveMap";
import OrderTimeLine from "../components/OrderTracking/OrderTimeLine";

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    setOrder(dummyDashboardOrdersData.find((o) => o._id === id) as any);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return null;
  }

  const isDelivered = order.status === "Delivered";
  const isCancelled = order.status === "Cancelled";

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-emerald-950 via-app-green to-emerald-800 pb-20">
      {/* =========================================================
          AMBIENT BACKGROUND GLOWS
      ========================================================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 size-125 rounded-full bg-emerald-400/15 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-[20%] size-150 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-48 left-[25%] size-150 rounded-full bg-teal-300/10 blur-3xl" />

      {/* =========================================================
          TRANSLUCENT SQUARE GRID
      ========================================================= */}

      <div
        className="
          pointer-events-none absolute inset-0
          opacity-[0.045]
          bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
        "
      />

      {/* =========================================================
          MAIN
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        {/* =======================================================
            BACK BUTTON
        ======================================================= */}

        <button
          onClick={() => navigate("/orders")}
          className="
            group mb-6
            flex items-center gap-2
            rounded-xl
            border border-white/10
            bg-white/5
            px-3.5 py-2
            text-sm font-medium
            text-emerald-100/80
            backdrop-blur-md
            transition-all duration-300
            hover:-translate-x-0.5
            hover:border-white/20
            hover:bg-white/10
            hover:text-white
          "
        >
          <ArrowLeftIcon className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Orders
        </button>

        {/* =======================================================
            ORDER HEADER
        ======================================================= */}

        <div
          className="
            relative mb-7 overflow-hidden
            rounded-3xl
            border border-white/15
            bg-white/10
            p-5 sm:p-6
            shadow-xl shadow-black/10
            backdrop-blur-xl
            animate-[fadeIn_0.5s_ease-out_both]
          "
        >
          {/* Header glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                  <PackageIcon className="size-4 text-emerald-200" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100/55">
                  Order Tracking
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-xs text-emerald-100/55">
                <CalendarDaysIcon className="size-3.5" />

                <span>
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Status */}
            <div
              className={`
                flex w-fit items-center gap-2 rounded-full
                border px-4 py-2
                text-xs font-bold
                backdrop-blur-md
                ${
                  isDelivered
                    ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-200"
                    : isCancelled
                      ? "border-red-300/30 bg-red-400/15 text-red-200"
                      : "border-orange-300/30 bg-orange-400/15 text-orange-200"
                }
              `}
            >
              <span
                className={`
                  size-2 rounded-full
                  ${
                    isDelivered
                      ? "bg-emerald-300"
                      : isCancelled
                        ? "bg-red-300"
                        : "animate-pulse bg-orange-300"
                  }
                `}
              />

              {order.status}
            </div>
          </div>
        </div>

        {/* =======================================================
            CONTENT GRID
        ======================================================= */}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* =====================================================
              LEFT
          ===================================================== */}

          <div className="space-y-6 lg:col-span-2">
            {/* OTP */}
            <OrderOTP order={order} />

            {/* Live Map */}
            <LiveMap order={order} liveLocation={liveLocation} />

            {/* Timeline */}
            <OrderTimeLine order={order} />

            {/* ===================================================
                DELIVERY PARTNER
            =================================================== */}

            {order?.deliveryPartner && !isDelivered && !isCancelled && (
              <div
                className="
                    group relative overflow-hidden
                    rounded-2xl
                    border border-white/15
                    bg-white/10
                    p-5
                    shadow-lg shadow-black/10
                    backdrop-blur-xl
                    transition-all duration-300
                    hover:border-white/25
                    hover:bg-white/15
                    hover:shadow-xl
                  "
              >
                <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-emerald-300/10 blur-3xl" />

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                          flex size-12 shrink-0 items-center justify-center
                          rounded-2xl
                          bg-linear-to-br from-emerald-400 via-emerald-500 to-app-green
                          text-white
                          shadow-lg shadow-emerald-950/20
                          transition-transform duration-300
                          group-hover:scale-105
                        "
                    >
                      <span className="text-sm font-bold">
                        {order.deliveryPartner.name.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {order.deliveryPartner.name}
                      </p>

                      <p className="mt-0.5 text-xs text-emerald-100/50 capitalize">
                        {order.deliveryPartner.vehicleType} • Delivery Partner
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${order.deliveryPartner.phone}`}
                    aria-label="Call delivery partner"
                    className="
                        flex size-10 items-center justify-center
                        rounded-xl
                        border border-white/10
                        bg-white/5
                        text-emerald-200
                        transition-all duration-200
                        hover:border-emerald-300/20
                        hover:bg-emerald-400/15
                        hover:shadow-md
                      "
                  >
                    <PhoneIcon className="size-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================
              RIGHT
          ===================================================== */}

          <div className="space-y-5">
            {/* ===================================================
                DELIVERY ADDRESS
            =================================================== */}

            <div
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-white/15
                bg-white/10
                p-5
                shadow-lg shadow-black/10
                backdrop-blur-xl
                transition-all duration-300
                hover:border-white/25
                hover:bg-white/15
              "
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-emerald-300/10 blur-3xl" />

              <div className="relative">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                    <MapPinIcon className="size-4 text-emerald-200" />
                  </span>
                  Delivery Address
                </h3>

                <div className="rounded-xl border border-white/10 bg-black/5 p-4">
                  <p className="text-sm font-semibold text-white/90">
                    {order.shippingAddress.label}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-emerald-100/60">
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zip}
                  </p>
                </div>
              </div>
            </div>

            {/* ===================================================
                ITEMS
            =================================================== */}

            <div
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-white/15
                bg-white/10
                p-5
                shadow-lg shadow-black/10
                backdrop-blur-xl
              "
            >
              <div className="pointer-events-none absolute -left-16 bottom-0 size-32 rounded-full bg-teal-300/10 blur-3xl" />

              <div className="relative">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                    <ReceiptTextIcon className="size-4 text-emerald-200" />
                  </span>
                  Items ({order.items.length})
                </h3>

                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="
                        flex items-center gap-3
                        rounded-xl
                        border border-white/5
                        bg-white/5
                        p-2.5
                        transition-all duration-200
                        hover:border-white/10
                        hover:bg-white/10
                      "
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/10">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="size-9 object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white/90">
                          {item?.name}
                        </p>

                        <p className="mt-0.5 text-xs text-emerald-100/45">
                          Quantity ×{item?.quantity}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-bold text-emerald-100/80">
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* Subtotal */}
                <div className="flex items-center justify-between py-1.5">
                  <p className="text-sm text-emerald-100/55">Subtotal</p>

                  <span className="text-sm font-medium text-white/80">
                    {currency}
                    {order.total.toFixed(2)}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex items-center justify-between py-1.5">
                  <p className="text-sm text-emerald-100/55">Delivery Fee</p>

                  <span className="text-sm font-medium text-white/80">
                    {order.deliveryFee === 0
                      ? "Free"
                      : `${currency}${order.deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex items-center justify-between py-1.5">
                  <p className="text-sm text-emerald-100/55">Tax</p>

                  <span className="text-sm font-medium text-white/80">
                    {currency}
                    {order.tax.toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="my-3 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white">Total</p>

                  <span className="bg-linear-to-r from-emerald-200 to-lime-200 bg-clip-text text-lg font-bold text-transparent">
                    {currency}
                    {(order.total + order.deliveryFee).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-emerald-100/35">
          <SparklesIcon className="size-3" />
          Tracking information updates as your order progresses
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
